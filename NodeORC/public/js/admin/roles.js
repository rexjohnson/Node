var elements = {
    btnCreate: null,
    txtName: null,

};
var init = function () {
    eventHandler.load_roles();
    elements.btnCreate = $('#btnCreateRole');
    elements.txtName = $('#btnName');
    elements.btnCreate.click(eventHandler.btnCreate_Click);

}
var eventHandler = {
    load_roles: function () {
        $.post('/getroles', function (data) {
            if (data.success == true) {
                eventHandler.append(data.data);
            } else {
                alert(data.message);
            }
        });
    },
    append: function (data) {
        $('.userfiles ul').empty();
        $.each(data, function (i, d) {
            if (d.role.toLowerCase() != 'admin') {
                $('.userfiles ul').append('<li value="' + d.id + '"><b>' + d.role + '</b><p class="ico-delete" onclick="delete_(this)"></p><p onclick="edit(this)" class="ico-edit"></p></li>');
            }
            else {
                $('.userfiles ul').append('<li value="' + d.id + '">' + d.role + '</li>');
            }
        });
    },
    btnCreate_Click: function () {
        if (elements.txtName.val() == '') {
            alert("Please enter the name.");
        } else {
            $.post('/createrole', { name: elements.txtName.val() }, function (data) {
                if (data.success) {
                    eventHandler.load_roles();
                    elements.txtName.val('');
                }
                else {
                    alert(data.message);
                }

            });
        }
    },
    edit_OnClick: function (e) {
        eventHandler.createDialog($(e).parent().find('b').text(), $(e).parent().attr('value'));
    },

    createDialog: function (text, id) {
        var customModal = $('<div style="display: block; width: 400px; margin-left: 19%; height: 141px;" class="custom-modal modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button></div><div class="modal-body" style=" max-height: 93px;min-height: 93px;"></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button></div></div>');
        $('body').append(customModal);
        $('.custom-modal').modal();
        $('.custom-modal .hide').show();
        var input = $('<input type="text" id="' + id + '" value="' + text + '" class="form-control"/>');
        var btn = $('<input style="margin: 5px 0px 0px;" type="button" value="update" class="btn btn-primary"/>');
        btn.click(function () {
            $.post('/updaterole', { id: input.attr('id'), role: input.val() }, function (data) {
                if (data.success == true) {
                    $('button.close').click();
                    eventHandler.load_roles();
                } else {
                    alert(data.message);
                }
            });
        });
        $('.modal-body').append(input).append(btn);
        $('.custom-modal').on('hidden.bs.modal', function () {
            $('.custom-modal').remove();
        });
    },
    delete_OnClick: function (dv) {

        if (confirm("Are you sure to delete this role?")) {
            $.post('/deleterole', { id: $(dv).parent().attr('value') }, function () {
                eventHandler.load_roles();
            });
        }
    }
}


function edit(dv) {
    eventHandler.edit_OnClick(dv);
}
function delete_(dv) {
    eventHandler.delete_OnClick(dv);
}
$(function () {
    init();
});
