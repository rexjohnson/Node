var api = require("./api.js");


module.exports = function (app) {
    app.get('/', isAuthenticated, function (req, res) {
        res.render('index.html', { title: 'Home Page', user: req.session.user });
    });
    app.get('/home', isAuthenticated, function (req, res) {
        res.render('index.html', { title: 'Home Page', user: req.session.user });
    });
    app.get('/login', function (req, res) {
        res.render('login.html', { message: "none" });
    });
    app.get('/admin/createuser', isAdmin, function (req, res) {
        res.render('createuser.html', { user: req.session.user });
    });

    app.get('/admin/roles', isAdmin, function (req, res) {
        res.render('roles.html', { user: req.session.user });
    });
    app.post('/getroles', api.getroles);
    app.post('/createuser', function (req, res) {
        var body = req.body;
        if (body.fname == '' || body.lname == '' || body.email == '' || body.password == '' || body.phone == '') {
            res.send("Please fill all the required fields");
        }
        else {
            api.registeruser(body, function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send("success");
                }
            });
        }

    });
    app.post('/login', function (req, res) {
        api.login(req.body, function (err, data) {
            if (err) {
                res.render('login.html', { message: err });
            } else {
                req.session.user = data;
                var redirect_url = req.body.url;
                if (redirect_url.indexOf('redirect') != -1) {
                    redirect_url = redirect_url.substr(redirect_url.lastIndexOf('redirect=')).replace('redirect=', '');
                    res.redirect(redirect_url);
                }
                else {
                    console.log("nope" + redirect_url);
                    res.redirect('/home');
                }
            }
        });
    });
    app.get('/signup', function (req, res) {
        res.render('signup.html', { message: "none" });
    });
    app.post('/signup', function (req, res) {
        var body = req.body;
        console.log(JSON.stringify(body));
        if (body.fname == '' || body.lname == '' || body.email == '' || body.password == '' || body.phone == '') {
            res.render('signup.html', { message: "Please fill all the required fields" });
        }
        api.registeruser(body, function (err, data) {
            if (err) {
                res.render('signup.html', { message: err });
            }
            else {
                res.redirect('/login');
            }
        });
    });
    app.post("/api/files", isAuthenticated, api.insertFile);
    app.post("/savefiles", isAuthenticated, api.savefiles);
    app.post("/getprocessed", isAuthenticated, api.getprocessed);
    app.post("/getunprocessed", isAuthenticated, api.getunprocessed)
    app.post('/extractfiles', isAuthenticated, api.extractText);
    app.post('/processall', isAuthenticated, api.processall)
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/home');
    });
    app.post('/getusers', isAdmin, api.getallusers);
    app.post('/updateuserroles', api.updateuserroles);
    app.post('/block_unblock', api.block_unblock_user);
    //admin section
    app.get('/admin/home', isAdmin, function (req, res) {
        res.render('admin.html');
    });
    app.get("/admin/userdetail/:id", isAdmin, function (req, res) {
        var id = req.url.substr(req.url.lastIndexOf('/') + 1);
        var user = api.getuserdetail(id, function (err, result) {
            if (!err) {
                console.log(JSON.stringify(result));
                res.render('udetail.html', { user: result });
            } else {
                res.render("500.html", message = err);
            }
        });
    });
    app.post('/deleteuser', api.deleteuser);
    app.post('/createrole', api.createrole);
    app.post('/updaterole', api.updaterole);
    app.post('/deleterole', api.deleterole);
}

function isAuthenticated(req, res, next) {
    if (req.session.user != 'undefined' && req.session.user != null) {
        return next();
    }
    else {
        res.redirect('/login?redirect=' + req.url)
    }
}

function isAdmin(req, res, next) {
    if (req.session.user != 'undefined' && req.session.user != null) {
        var roles = req.session.user.roles;
        if (typeof roles == 'undefined') {
            res.redirect('/home');
        }
        else {

            var admin = roles.filter(function (d) {
                console.log(d.role);
                return d.role == 'Admin'
            });
            if (admin.length > 0) {
                return next();
            } else {
                res.redirect('/home')
            }
        }


    }
    else {
        res.redirect('/login?redirect=' + req.url)
    }
}