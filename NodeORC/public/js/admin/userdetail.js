var elements = {
    user: null,
    show_file_detail: null,
    name: null,
    date: null,
    email: null,
    phone: null,
    filesCount: null,
    userfiles: null,
    status: null,
    userRoles: null,
    btnUpdateRole: null,
    btnBlock: null,
    btnDelete: null,
}


var init = function () {
    elements.user = JSON.parse($('#hdnUser').val());
    elements.show_file_detail = $('.show_file_detail');
    elements.name = $('#lblName');
    elements.date = $('#lblDate');
    elements.email = $('#lblEmail');
    elements.phone = $('#lblPhone');
    elements.filesCount = $('#lblTotalFiles');
    elements.userfiles = $('.userfiles ul');
    elements.status = $('#lblStatus');
    elements.userRoles = $('.userRoles ul');
    elements.btnBlock = $('#btnBlock');
    elements.btnDelete = $('#btnDelete');
    elements.btnDelete.click(eventHandler.btnDelete_OnClick);

    elements.btnBlock.click(eventHandler.block_unblock_OnClick);
    elements.btnUpdateRole = $('#btnUpdateRole');
    elements.btnUpdateRole.click(eventHandler.btnUpdateRole_OnClick);
    elements.show_file_detail.click(eventHandler.show_file_OnClick);

    eventHandler.bindUser();
}

var eventHandler = {
    show_file_OnClick: function () {
        var id = $(this).attr('id');
        var file = eventHandler.getFile(id)[0];
        eventHandler.createDialog(file);
    },
    getFile: function (id) {
        return elements.user.files.filter(function (d) {
            return d.id == id
        });
    },
    bindUser: function () {
        elements.email.text(elements.user.email);
        elements.phone.text(elements.user.phone);
        elements.filesCount.text(elements.user.files.length);
        elements.name.text(elements.user.first_name + " " + elements.user.last_name);
        elements.date.text(new Date(elements.user.create_on).formatDate());
        var status = elements.user.isblocked == 0 ? "Un Blocked" : 'Blocked';
        var txt = elements.user.isblocked == 0 ? "Block User" : "Un Block User";
        elements.btnBlock.val(txt);
        elements.status.text(status);
        eventHandler.bindFiles();
        eventHandler.bindRoles();
    },
    bindFiles: function () {
        elements.userfiles.empty();
        if (elements.user.files.length <= 0) {
            var li = $('<li/>', { text: "Files not found under this user." });
            elements.userfiles.append(li);
        }
        $.each(elements.user.files, function (i, d) {
            var li = $('<li/>');
            var anchr = $('<a/>', { href: 'javascript:;', id: d.id, text: d.filename }).appendTo(li);
            elements.userfiles.append(li);
            anchr.click(eventHandler.show_file_OnClick);
        });
    },
    bindRoles: function () {
        elements.userRoles.empty();

        $.each(elements.user.allRoles, function (i, d) {
            if (eventHandler.isRoleExists(d.id)) {
                elements.userRoles.append('<li><input type="checkbox" id="' + d.id + '" checked="checked"/><label for="' + d.id + '">' + d.role + '</label></li>');
            } else {
                elements.userRoles.append('<li><input type="checkbox" id="' + d.id + '" /><label for="' + d.id + '">' + d.role + '</label></li>');
            }
        });
    },
    isRoleExists: function (id) {
        var getrole = elements.user.roles.filter(function (d) { return d.id == id });
        return getrole.length > 0 ? true : false;
    },
    createDialog: function (file) {

        var customModal = $('<div class="custom-modal modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button></div></div>');
        $('body').append(customModal);
        $('.custom-modal').modal();
        $('.custom-modal .hide').show();
        $('.modal-body').html(eventHandler.fileHttml(file));
        $('.custom-modal').on('hidden.bs.modal', function () {
            $('.custom-modal').remove();
        });
    },
    fileHttml: function (file) {
        var detail = $('<div class="modal_file"></div>');
        var p = file.isprocessed == 0 ? 'No' : 'Yes';
        var dvDetail = $('<div/>', { 'class': 'details' });
        var table = $('<table/>').appendTo(dvDetail);
        var fileSize = (file.size / (1024 * 1024)).toFixed(2);
        var tr = '<tr><td>Name:</td><td>' + file.filename + '</td></tr><tr><td>FileID:</td><td>' + file.fileId + '</td></tr><tr><td>Upload On:</td><td>' + new Date(file.createon).formatDate() + '</td></tr><tr><td>File Size:</td><td>' + fileSize + ' MB</td></tr><tr><td>Processed:</td><td>' + p + '</td></tr>';
        table.append(tr);
        detail.append(dvDetail);
        var text = file.text != null ? file.text : '';
        detail.append('<div class="image"><img src="/' + file.fileId + "." + file.extension + '"></div><div class="text">' + text + '</div>');
        return detail;
    },
    btnUpdateRole_OnClick: function () {
        var len = elements.userRoles.find('input[type="checkbox"]:checked').length;
        if (len == 0) {
            alert("Please select role first.")
        } else {
            var selected_roles = [];
            elements.userRoles.find('input[type="checkbox"]:checked').each(function () {
                selected_roles.push($(this).attr('id'));
            });
            $.post('/updateuserroles', { userId: elements.user.id, roles: selected_roles }, function (data) {
                if (data == "Done") {
                    alert("Roles updated successfully.");
                } else {
                    alert(data);
                }
            });
        }
    },
    block_unblock_OnClick: function () {
        if (confirm("Are you sure for " + $(this).val() + "?")) {
            var status = elements.user.isblocked == 0 ? true : false;
            $.post('/block_unblock', { userId: elements.user.id, status: status }, function (data) {
                if (data == "done") {
                    alert("Opration successfully done");
                    elements.user.isblocked = status == true ? 1 : 0;
                    eventHandler.bindUser();
                }
            });
        }
    },
    btnDelete_OnClick: function () {
        if (confirm("Are you sure? All files related with this user will also delete!")) {
            $.post('/deleteuser', { id: elements.user.id }, function (data) {
                if (data.success == "true" || data.success == true) {
                    window.location.href = "/admin/home";
                } else {
                    alert(data.message);
                }
            });
        }
    },

}

$(function () {
    init();
});

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
Date.prototype.formatDate = function () {
    return (this.getDate() + ' ' + monthNames[this.getMonth()] + ', ' + this.getFullYear());
};
