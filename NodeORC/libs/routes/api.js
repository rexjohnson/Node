var config = require("../config/config.js"),
    connection = require('express-myconnection'),
    mysql = require('mysql'),
    formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    settings = require('../../settings.js'),
    app = require('../../app.js'),
    bcrypt = require('bcrypt'),
    io = app.io;
var fs = require('fs');
var tesseract = require('node-tesseract');
var nodecr = require('nodecr');
var continue_ = true;
io.sockets.on('connection', function (socket) {

});

con = mysql.createConnection(
   {
       host: config.host,
       user: config.user,
       password: config.password,
       database: config.database,
   }
);

var del = con._protocol._delegateError;
con._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};
exports.updateuserroles = function (req, res) {
    if (req.body.roles.length == 0) {
        res.send('Please select role first');
    } else {
        var delete_role = 'delete from  orc_user_in_role where user_id="' + req.body.userId + '"';
        con.query(delete_role, function (err, roles) {
            if (!err) {
                req.body.roles.forEach(function (data, i) {
                    var insert = 'Insert into orc_user_in_role(role_id,user_id) VALUES("' + data + '","' + req.body.userId + '")';
                    con.query(insert, function (err, rows) {
                        if (parseInt(i + 1) == req.body.roles.length) {
                            res.send("Done");
                        }
                    });

                });
            }
        });
    }
}

exports.registeruser = function (req, res) {
    console.log(req.email);
    var isEmailExists = 'SELECT * FROM orc_users where email="' + req.email + '"';
    con.query(isEmailExists, function (err, rows, fields) {
        if (err) {
            res(err, null);
        }
        if (rows.length >= 1) {
            res("Email address already exists.", null);
        } else {
            exports.cryptPassword(req.password, function (err, hash) {
                if (!err) {
                    var insert = 'INSERT INTO orc_users(first_name ,last_name,email,password,phone,create_on) VALUES("' + req.fname + '", "' + req.lname + '", "' + req.email + '", "' + hash + '", "' + req.phone + '", "' + new Date().toMysqlFormat() + '")';
                    con.query(insert, function (err, rows, resut) {
                        console.log(JSON.stringify(rows));
                        console.log(JSON.stringify(resut));
                        if (err) {
                            console.log(err);
                            res("Unknown error occured please try again later", null);
                        } else {
                            if (typeof req.roles != 'undefined' && req.roles != null && req.roles.length > 0) {
                                req.roles.forEach(function (r) {
                                    var q = 'INSERT INTO orc_user_in_role(role_id,user_id) VALUES("' + r + '", "' + rows.insertId + '")';
                                    con.query(q, function (err, result) {

                                    });
                                });
                            }
                            res(null, rows);
                        }
                    });
                } else {
                    res("Unknown error occured please try again later", null);
                }
            });
        }
    });
}

exports.insertFile = function (req, res) {
    var form = new formidable.IncomingForm(),
      files = [],
      fields = [];
    var uploadDir = settings.PROJECT_DIR + "/" + config.fileslocation + '/uploads';
    form.uploadDir = uploadDir;

    form
     .on('field', function (field, value) {
         console.log(field, value);
         fields.push([field, value]);
     })
      .on('file', function (field, file) {
          console.log(field, file);
          files.push([field, file]);
      })
      .on('progress', function (bytesReceived, bytesExpected) {
          var progress = {
              type: 'progress',
              bytesReceived: bytesReceived,
              bytesExpected: bytesExpected
          };
          io.sockets.emit("progress", progress);
      })
    .on('end', function () {
        res.send(files);
    });
    form.parse(req);
}

exports.getprocessed = function (req, res) {
    var query = con.query('SELECT * FROM orc_files where text IS NOT NULL and isprocessed=true and userid="' + req.session.user.id + '"', function (err, rows, fields) {
        res.send(rows);
    });
    query.on('result', function (files) {
        // console.log(files);

    });
}

exports.getuserdetail = function (req, res) {
    var user = 'Select * from orc_users where id="' + req + '"';
    con.query(user, function (err, row) {
        if (err) {
            res(err, null);
        }
        else {
            exports.getuserfiles(row, function (err, data) {
                if (err)
                    res(err, null);
                else
                    res(null, data);
            });
        }
    });
}
exports.getuserfiles = function (user, cb) {
    user = user[0];
    if (typeof user == 'undefined' || user == null || user.length == 0) {
        cb("User not found or may be deleted by the website owner.", null);
    } else {
        var files = 'SELECT * from orc_files where userid="' + user.id + '"';
        con.query(files, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                user.files = result;
                exports.getuserroles(user, function (err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, data);
                    }
                });
            }
        });
    }
}

exports.getuserroles = function (user, cb) {
    var userroles = 'SELECT role,T1.id  FROM orc_user_roles AS T1 INNER JOIN orc_user_in_role AS t2 ON T1.id = t2.role_id  WHERE t2.user_id="' + user.id + '"';
    con.query(userroles, function (err, p, dt) {
        if (err) {
            cb(err, null);
        }
        else {
            var allroles = 'select * from orc_user_roles';
            con.query(allroles, function (err, all_role, none) {;
                user.roles = p;
                user.allRoles = all_role;
                cb(err, user);
            });
        }
    });
}
exports.getunprocessed = function (req, res) {
    var query = con.query('SELECT * FROM orc_files where text IS NULL and isprocessed=false and userid="' + req.session.user.id + '"', function (err, rows, fields) {
        res.send(rows);
    });
    query.on('result', function (files) {
        // console.log(files);

    });
}
exports.createrole = function (req, res) {
    if (req.body.name != '') {
        var query = 'INSERT INTO orc_user_roles(role) VALUES("' + req.body.name + '")';
        var find = 'SELECT * from orc_user_roles where role="' + req.body.name + '"';
        con.query(find, function (err, result) {
            if (result.length <= 0) {
                con.query(query, function (err, row) {
                    if (!err) {
                        res.send({ success: true, message: '' })
                    } else {
                        res.send({ success: false, message: 'Unknown error please try again' })
                    }
                });
            }
            else {
                res.send({ success: false, message: 'Role with name already exists.' })
            }
        });
    } else {
        res.send({ success: false, message: 'Please enter the name' })
    }
}
exports.updaterole = function (req, res) {
    if (req.body.role != '') {
        var find = 'SELECT * from orc_user_roles where role="' + req.body.role + '"';
        con.query(find, function (err, result) {
            if (result.length <= 0) {
                var query = 'UPDATE  orc_user_roles set role="' + req.body.role + '" where id="' + req.body.id + '"';
                con.query(query, function (err, row) {
                    if (!err) {
                        res.send({ success: true, message: '' })
                    } else {
                        res.send({ success: false, message: 'Unknown error please try again' })
                    }
                });
            }
            else {
                res.send({ success: false, message: 'Role with name already exists.' })
            }
        });

    } else {
        res.send({ success: false, message: 'Please enter the name' })
    }
},
exports.deleterole = function (req, res) {
    console.log(JSON.stringify(req.body));
    var query = 'DELETE FROM orc_user_roles where id="' + req.body.id + '"';
    con.query(query, function (err, result) {
        if (!err) {
            res.send({ success: true, message: '' })
        } else {
            res.send({ success: false, message: 'Unknown error please try again' })
        }
    });
}
exports.savefiles = function (req, res) {
    var data = req.body.data;
    data = data.replace("%name%", "orc_files").replace("%userid%", req.session.user.id);
    console.log(data);
    var query = con.query(data);
    query.on('result', function (files) {
        //console.log(files);
    });
    var old = settings.PROJECT_DIR + "/" + config.fileslocation + '/uploads' + "/" + req.body.name;
    fs.rename(old, old + "." + req.body.ext, function (err) {
        res.send("sfd");
    });

}

exports.getroles = function (req, res) {
    console.log("PPP");
    if (isAdmin(req.session.user.roles)) {
        var query = "SELECT * From orc_user_roles";
        con.query(query, function (err, rows) {
            if (err) {
                res.send({ success: false, message: 'Unknown error. Please try again latter.' });
            }
            else {
                res.send({ success: true, data: rows });
            }
        });
    }
    else {
        res.send({ success: false, message: 'You are not authrized to access this section.' })
    }
}

exports.processall = function (req, res) {
    continue_ = true;
    var query = con.query('SELECT * FROM orc_files where text IS NULL and isprocessed=false and userid="' + req.session.user.id + '"', function (err, rows, fields) {
        console.log(rows);
        filtterimages(rows, function (getimages) {
            var lst = 0;
            getimages.forEach(function (d, i) {
                if (continue_ == true) {
                    var options = {
                        l: 'eng',
                        psm: 6
                    };
                    tesseract.process(settings.PROJECT_DIR + "/" + config.fileslocation + '/uploads/' + d.fileId + "." + d.extension, options, function (err, text) {
                        if (err) {
                            console.error(err);
                        } else {
                            text = text.replace(new RegExp('"', 'g'), '‘');
                            text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
                            con.query('UPDATE orc_files set text="' + text + '", isprocessed=true where fileId="' + d.fileId + '"', function (err, p, ps) {
                                lst = parseInt(lst) + (1)
                                io.sockets.emit("imageprogress", { done: lst, all: getimages.length });
                            });
                        }

                        if (i == (getimages.length - 1)) {
                            res.send("done");
                        }

                    });


                } else {
                    res.send("done");
                }
            });

        });
    });
}

exports.extractText = function (req, res) {


    //// Recognize text of any language in any format
    //var options = {
    //    psm: 6,
    //}


    //tesseract.process(settings.PROJECT_DIR + "/" + config.fileslocation + '/uploads' + "/ddd.gif", options, function (err, text) {
    //    if (err) {
    //        console.error(err);
    //    } else {
    //        console.log(text);
    //        res.send(text);
    //    }
    //});
}

exports.login = function (req, res) {
    exports.cryptPassword(req.password, function (err, hash) {
        if (!err) {

            //get the user from database by email address
            var query = 'SELECT * From orc_users where email="' + req.email + '"';
            con.query(query, function (err, user, dt) {
                if (err) {
                    res(err, null);
                }
                else {

                    //check if user exists with email address
                    if (user.length >= 1) {

                        if (user[0].isblocked[0] == 1) {
                            res("Your account has been blocked please contact with administrator of website.", null);
                        } else {
                            //compare hashed password 
                            exports.comparePassword(req.password, user[0].password, function (err, resullt) {
                                if (resullt == true) {
                                    //get first user
                                    var usr = user[0];
                                    //get the roles of user
                                    var userroles = 'SELECT role,T1.id  FROM orc_user_roles AS T1 INNER JOIN orc_user_in_role AS t2 ON T1.id = t2.role_id  WHERE t2.user_id="' + usr.id + '"';
                                    con.query(userroles, function (err, p, dt) {
                                        usr.roles = p;
                                        var all = "select * from orc_user_roles";
                                        con.query(all, function (err, ar) {
                                            usr.allRoles = ar;
                                            res(err, usr);
                                        });
                                    });

                                } else {
                                    res("Invalid username/email combination.", null);
                                }
                            });
                        }
                    } else {
                        res("Invalid username/email combination.", null);
                    }
                }
            });
        }
        else {
            res(err, null);
        }
    });
}

exports.getallusers = function (req, res) {
    var query = con.query('SELECT * FROM orc_users', function (err, rows, fields) {
        res.send(rows);
    });
}

exports.block_unblock_user = function (req, res) {

    if (req.body.userId == req.session.user.id) {
        res.send("You cann't block/unblock yourself.")
    } else {
        var query = 'UPDATE orc_users set isblocked=' + req.body.status + ' where id="' + req.body.userId + '"';
        con.query(query, function (err, result) {
            if (err)
                res.send(err)
            else
                res.send("done")
        });
    }
}

exports.deleteuser = function (req, res) {
    var user = req.session.user;

    if (isAdmin(user.roles)) {
        if (user.id == req.body.id) {
            res.send({ success: false, message: "You can't delete your own account." });
        } else {
            var delete_files = 'Delete from orc_files where userid="' + req.body.id + '"';
            var delete_user_in_role = 'Delete from orc_user_in_role where user_id="' + req.body.id + '"';
            var delete_user = 'DELETE from orc_users where id="' + req.body.id + '"';
            con.query(delete_files, function (err, result) {
                if (!err) {
                    con.query(delete_user_in_role, function (err, result) {
                        if (!err) {
                            con.query(delete_user, function (err, result) {
                                if (!err) {
                                    res.send({ success: true, message: "User successfully deleted!" });
                                } else {
                                    res.send({ success: false, message: "Unknown error! Please try again later!" });
                                }
                            });
                        }
                        else {
                            res.send({ success: false, message: "Unknown error! Please try again later!" });
                        }
                    });
                } else {
                    res.send({ success: false, message: "Unknown error! Please try again later!" });
                }
            });
        }
    } else {
        res.send({ success: false, message: "You are not authrized to delete this user." });
    }
}

function filtterimages(arr, callback) {
    var list = arr.filter(function (obj) {
        return (obj.extension === "png" || obj.extension == "gif" || obj.extension == "jpg" || obj.extension == "jpeg" || obj.extension == "BMP");
    });
    callback(list);
}

exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });

    });
};

exports.comparePassword = function (password, userPassword, callback) {
    bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
        if (err)
            return callback(err);
        return callback(null, isPasswordMatch);
    });
};

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}
function isAdmin(roles) {
    var admin = [];
    roles.forEach(function (s) {
        if (s.role == "Admin") {
            admin.push(s);
        }
    });
    var result = admin.length > 0 ? true : false;
    admin = null;
    return result;
}