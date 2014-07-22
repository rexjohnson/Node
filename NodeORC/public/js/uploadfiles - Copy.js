$(document).ready(function () {
    init();

    //processed("", function (data) {
    //    $('.nav.navbar-nav.navbar-right a:first').addClass('active');
    //});

    //$(document).on('click', '.files_container a.show-modal-popup', function () {
    //    createDialog($(this));
    //})

    //$('.nav.navbar-nav.navbar-right a').click(function () {
    //    $('.nav.navbar-nav.navbar-right a').removeClass('active');
    //    $(this).addClass('active');
    //    var txt = $(this).text().toLowerCase();
    //    if (txt == 'processed') {
    //        processed("", function (data) {
    //        });
    //    } else {
    //        unprocessed("", function () {
    //            var input = $('<input/>', { type: 'button', id: 'process', value: 'Process Images', 'class': 'btn btn-primary' });
    //            $('.dataTables_length').after(input);
    //            input.click(on_process_click);
    //        });
    //    }

    //});

    //var files = [];
    //var socket = io.connect();
    //socket.on("connect", function (data) {

    //});
    //socket.on("progress", function (data) {
    //    console.log(data);
    //});
    //socket.on("file", function (data) {
    //    alert(JSON.stringify(data));
    //});
    //socket.on("imageprogress", function (data) {
    //    $('.wait div').text("Please wait processing images.. files processed " + data.done + " out of " + data.all);
    //});

    //$('input[type="submit"]').click(function () {
    //    var names = $('#file_input').prop("files")
    //    files = $.map(names, function (val) {
    //        return val.name;
    //    });

    //});
    //$('#uploadForm').bind('submit', function (e) {
    //    e.preventDefault(); // <-- important
    //    if ($('#file_input').val() == '') {
    //        alert("Please select files.");
    //        return;
    //    }
    //    $('.hell').text("please wait files uploading..")
    //    $(this).ajaxSubmit({
    //        dataType: 'text',
    //        error: function (xhr) {

    //        },

    //        success: function (response) {
    //            try {
    //                response = $.parseJSON(response);
    //                $('#file_input').val("");
    //                $.each(response, function (i, d) {
    //                    $('.hell').text("please wait files uploading..");
    //                    d = d[1];
    //                    var ext = d.name.split('.').pop();
    //                    var id = d.path.substr(d.path.lastIndexOf("\\") + 1);
    //                    var insert = 'INSERT INTO %name% (filename,createon,extension,filetype,size,fileId) VALUES("' + d.name + '","' + new Date() + '","' + ext + '","","' + d.size + '","' + id + '")';
    //                    $.post('/savefiles', { data: insert, name: id, ext: ext }, function () {
    //                        if (i == (response.length - 1)) {
    //                            var txt = $('.nav.navbar-nav.navbar-right a.active').text().toLowerCase();
    //                            var page = $('.paginate_button.current').text();
    //                            if (txt == 'processed') {
    //                                processed(function () {
    //                                    $("a.paginate_button:contains('" + page + "')").click();
    //                                });
    //                            } else {
    //                                unprocessed("", function () {
    //                                    $("a.paginate_button:contains('" + page + "')").click();
    //                                    var input = $('<input/>', { type: 'button', id: 'process', value: 'Process Images', 'class': 'btn btn-primary' });
    //                                    $('.dataTables_length').after(input);
    //                                    input.click(on_process_click);
    //                                });
    //                            }
    //                        }
    //                    });
    //                    if (parseInt(i + 1) == response) { $('.hell').text("Files uploaded successfully..."); }
    //                });

    //            }
    //            catch (e) {

    //                return;
    //            }

    //            if (response.error) {

    //                return;
    //            }

    //            var imageUrlOnServer = response.path;

    //        }
    //    });
    //});
});



//function processed(obj, callback) {
//    $.post('/getprocessed', function (data) {
//        $('.files_container').empty();
//        var table = $('<table/>');
//        $('.files_container').append(table);
//        var thead = $('<thead><tr><th>File Name</th><th>File ID</th><th>Upload Date</th><th>Size</th></tr></thead>');
//        table.append(thead);
//        var tbody = $('<tbody/>');
//        table.append(tbody);

//        if (data.length > 0) {
//            $.each(data, function (i, d) {
//                var sizeInMB = (d.size / (1024 * 1024)).toFixed(2);
//                tbody.append("<tr><td><a class='show-modal-popup' data-file='" + d.fileId + "." + d.extension + "' data='" + d.text + "' href='javascript:;'>" + d.filename + "</a></td><td>" + d.fileId + "</td><td>" + new Date(d.createon).formatDate() + "</td><td>" + sizeInMB + " MB" + "</td></tr>")
//            });
//            table.dataTable();
//        }
//        else {
//            tbody.append("<tr><td>Files not found on server.</td><td></td><td></td><td></td></tr>");
//            table.dataTable();
//            $('.paging_simple_numbers,.dataTables_length,.dataTables_filter,.dataTables_info').hide();
//        }

//        callback("done");
//    });
//}

//function unprocessed(obj, callback) {
//    $.post('/getunprocessed', function (data) {
//        $('.files_container').empty();
//        var table = $('<table/>');
//        $('.files_container').append(table);
//        var thead = $('<thead><tr><th>File Name</th><th>File ID</th><th>Upload Date</th><th>Size</th></tr></thead>');
//        table.append(thead);
//        var tbody = $('<tbody/>');
//        table.append(tbody);

//        if (data.length > 0) {
//            $.each(data, function (i, d) {
//                var sizeInMB = (d.size / (1024 * 1024)).toFixed(2);
//                tbody.append("<tr><td>" + d.filename + "</td><td>" + d.fileId + "</td><td>" + new Date(d.createon).formatDate() + "</td><td>" + sizeInMB + " MB" + "</td></tr>")
//            });
//            table.dataTable();
//        }
//        else {
//            tbody.append("<tr><td>Files not found on server.</td><td></td><td></td><td></td></tr>");
//            table.dataTable();
//            $('.paging_simple_numbers,.dataTables_length,.dataTables_filter,.dataTables_info').hide();
//        }
//        callback("done");
//    });
//}

//function on_process_click() {
//    if ($('.dataTable tbody tr').length <= 1) {
//        return;
//    }

//    if (confirm("Are you sure to process all images")) {
//        $('.back_main').show();
//        $('.wait div').text("Please wait processing images..");
//        $.post('/processall', function () {
//            $('.back_main').hide();
//            unprocessed("", function () {

//            });
//        });
//    }
//}

//function createDialog(a) {
//    var customModal = $('<div class="custom-modal modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button></div></div>');
//    $('body').append(customModal);
//    $('.custom-modal').modal();
//    $('.custom-modal .hide').show();
//    $('.modal-body').append('<textarea style="width:100%;max-width:912px;max-height:250px;min-height:250px">' + a.attr('data') + '</textarea>').append('<a id="single_image" href="' + a.attr('data-file') + '"><img style="margin:4px 0px 0px 0px;height:45px;width:50px"   src="/' + a.attr('data-file') + '" alt=""/></a>');
//    $('.modal-body a').fancybox({
//        'transitionIn': 'elastic',
//        'transitionOut': 'elastic',
//        'speedIn': 600,
//        'speedOut': 200,
//        'overlayShow': false
//    });
//    $('.custom-modal').on('hidden.bs.modal', function () {
//        $('.custom-modal').remove();
//    });

//}



var elements = {
    document: null,
    navmenu: null,
    socket: null,
    form: null
}


var init = function () {
    elements.document = $(document);
    elements.navmenu = $('.nav.navbar-nav.navbar-right a');
    elements.socket = io.connect();
    eventHandler.manage_sockets();
    elements.form = $('#uploadForm');
    elements.form.bind('submit', eventHandler.bind_form);
    elements.navmenu.click(eventHandler.navmenu_OnClick);
    elements.document.on('click', '.files_container a.show-modal-popup', eventHandler.showmodal_OnClick);
   
    eventHandler.processed("", function () {
        $('.nav.navbar-nav.navbar-right a:first').addClass('active');
    });
}

var eventHandler = {
    showmodal_OnClick: function () {
        eventHandler.createDialog($(this));
    },
    createDialog: function (a) {
        var customModal = $('<div class="custom-modal modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button></div></div>');
        $('body').append(customModal);
        $('.custom-modal').modal();
        $('.custom-modal .hide').show();
        $('.modal-body').append('<textarea style="width:100%;max-width:912px;max-height:250px;min-height:250px">' + a.attr('data') + '</textarea>').append('<a id="single_image" href="' + a.attr('data-file') + '"><img style="margin:4px 0px 0px 0px;height:45px;width:50px"   src="/' + a.attr('data-file') + '" alt=""/></a>');
        $('.modal-body a').fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 600,
            'speedOut': 200,
            'overlayShow': false
        });
        $('.custom-modal').on('hidden.bs.modal', function () {
            $('.custom-modal').remove();
        });
    },
    navmenu_OnClick: function () {
        $('.nav.navbar-nav.navbar-right a').removeClass('active');
        $(this).addClass('active');
        var txt = $(this).text().toLowerCase();
        if (txt == 'processed') {
            eventHandler.processed("", function (data) {
            });
        } else {
            eventHandler.unprocessed("", function () {
                var input = $('<input/>', { type: 'button', id: 'process', value: 'Process Images', 'class': 'btn btn-primary' });
                $('.dataTables_length').after(input);

            });
        }
    },
    processed: function (d, cb) {
        $.post('/getprocessed', function (data) {
            $('.files_container').empty();
            var table = $('<table/>');
            $('.files_container').append(table);
            var thead = $('<thead><tr><th>File Name</th><th>File ID</th><th>Upload Date</th><th>Size</th></tr></thead>');
            table.append(thead);
            var tbody = $('<tbody/>');
            table.append(tbody);

            if (data.length > 0) {
                $.each(data, function (i, d) {
                    var sizeInMB = (d.size / (1024 * 1024)).toFixed(2);
                    tbody.append("<tr><td><a class='show-modal-popup' data-file='" + d.fileId + "." + d.extension + "' data='" + d.text + "' href='javascript:;'>" + d.filename + "</a></td><td>" + d.fileId + "</td><td>" + new Date(d.createon).formatDate() + "</td><td>" + sizeInMB + " MB" + "</td></tr>")
                });
                table.dataTable();
            }
            else {
                tbody.append("<tr><td>Files not found on server.</td><td></td><td></td><td></td></tr>");
                table.dataTable();
                $('.paging_simple_numbers,.dataTables_length,.dataTables_filter,.dataTables_info').hide();
            }

            cb("done");
        });
    },
    unprocessed: function (d, cb) {
        $.post('/getunprocessed', function (data) {
            $('.files_container').empty();
            var table = $('<table/>');
            $('.files_container').append(table);
            var thead = $('<thead><tr><th>File Name</th><th>File ID</th><th>Upload Date</th><th>Size</th></tr></thead>');
            table.append(thead);
            var tbody = $('<tbody/>');
            table.append(tbody);

            if (data.length > 0) {
                $.each(data, function (i, d) {
                    var sizeInMB = (d.size / (1024 * 1024)).toFixed(2);
                    tbody.append("<tr><td>" + d.filename + "</td><td>" + d.fileId + "</td><td>" + new Date(d.createon).formatDate() + "</td><td>" + sizeInMB + " MB" + "</td></tr>")
                });
                table.dataTable();
            }
            else {
                tbody.append("<tr><td>Files not found on server.</td><td></td><td></td><td></td></tr>");
                table.dataTable();
                $('.paging_simple_numbers,.dataTables_length,.dataTables_filter,.dataTables_info').hide();
            }
            cb("done");
        });
    },
    manage_sockets: function () {
        elements.socket.on("connect", function (data) {

        });
        elements.socket.on("progress", function (data) {
            console.log(data);
        });
        elements.socket.on("file", function (data) {
            alert(JSON.stringify(data));
        });
        elements.socket.on("imageprogress", function (data) {
            $('.wait div').text("Please wait processing images.. files processed " + data.done + " out of " + data.all);
        });
    },
    bind_form: function (e) {
        e.preventDefault(); // <-- important
        if ($('#file_input').val() == '') {
            alert("Please select files.");
            return;
        }
        $('.hell').text("please wait files uploading..")
        $(this).ajaxSubmit({
            dataType: 'text',
            error: function (xhr) {

            },

            success: function (response) {
                try {
                    response = $.parseJSON(response);
                    $('#file_input').val("");
                    $.each(response, function (i, d) {
                        $('.hell').text("please wait files uploading..");
                        d = d[1];
                        var ext = d.name.split('.').pop();
                        var id = d.path.substr(d.path.lastIndexOf("\\") + 1);
                        var insert = 'INSERT INTO %name% (filename,createon,extension,filetype,size,fileId) VALUES("' + d.name + '","' + new Date() + '","' + ext + '","","' + d.size + '","' + id + '")';
                        $.post('/savefiles', { data: insert, name: id, ext: ext }, function () {
                            if (i == (response.length - 1)) {
                                var txt = $('.nav.navbar-nav.navbar-right a.active').text().toLowerCase();
                                var page = $('.paginate_button.current').text();
                                if (txt == 'processed') {
                                    eventHandler.processed("", function () {
                                        $("a.paginate_button:contains('" + page + "')").click();
                                    });
                                } else {
                                    eventHandler.unprocessed("", function () {
                                        $("a.paginate_button:contains('" + page + "')").click();
                                        var input = $('<input/>', { type: 'button', id: 'process', value: 'Process Images', 'class': 'btn btn-primary' });
                                        $('.dataTables_length').after(input);
                                        input.click(eventHandler.on_process_click);
                                    });
                                }
                            }
                        });
                        if (parseInt(i + 1) == response) { $('.hell').text("Files uploaded successfully..."); }
                    });

                }
                catch (e) {

                    return;
                }

                if (response.error) {

                    return;
                }
                var imageUrlOnServer = response.path;
            }
        });
    },
    on_process_click: function () {
        alert("sdfsd");
        if ($('.dataTable tbody tr').length <= 1) {
            return;
        }

        if (confirm("Are you sure to process all images")) {
            $('.back_main').show();
            $('.wait div').text("Please wait processing images..");
            $.post('/processall', function () {
                $('.back_main').hide();
                eventHandler.unprocessed("", function () {
                });
            });
        }
    }
}

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
Date.prototype.formatDate = function () {
    return (this.getDate() + ' ' + monthNames[this.getMonth()] + ', ' + this.getFullYear());
};