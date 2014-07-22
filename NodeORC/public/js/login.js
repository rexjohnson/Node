var elements = {
    form: null,

}
var eventHandler = {
    form_OnSubmit: function () {
        return $(this).rudravalidation();
    }

};
var init = function () {
    elements.form = $('form');
    elements.form.bind('submit', eventHandler.form_OnSubmit);
    $('input[type=hidden]').val(window.location.href);
}

$(function () {
    init();
});