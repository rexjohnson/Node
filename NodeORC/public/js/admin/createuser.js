var elements = {
    root: null,
    btnCreate: null,
    txtFirstName: null,
    txtLastName: null,
    txtEmail: null,
    txtPassword: null,
    txtPhone: null

};
var eventHandler = {
    btnCreate_OnClick: function () {
        if (elements.txtFirstName.val() == '' || elements.txtPassword.val() == '' || elements.txtEmail.val() == '' || elements.txtLastName.val() == '') {
            alert("Please fill all required fields.");
        } else {
            var roles = [];
            $('.roles input[type="checkbox"]:checked').each(function () {
                roles.push($(this).attr('id'));
            });
            $.post('/createuser', { fname: elements.txtFirstName.val(), lname: elements.txtLastName.val(), email: elements.txtEmail.val(), password: elements.txtPassword.val(), phone: elements.txtPhone.val(), roles: roles }, function (data) {
                if (data == "success") {
                    window.location.href = "/admin/home";
                } else {
                    alert(data);
                }
            });
        }
    }
}
var init = function () {

    elements.btnCreate = $('#btnCreateUser');
    elements.txtFirstName = $('#txtFirstName');
    elements.txtLastName = $('#txtLastName');
    elements.txtEmail = $('#txtEmail');
    elements.txtPassword = $('#txtPassword');
    elements.txtPhone = $('#txtPhone');
    elements.btnCreate.click(eventHandler.btnCreate_OnClick);
}

$(function () {
    init();
});