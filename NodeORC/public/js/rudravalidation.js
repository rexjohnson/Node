$.fn.rudravalidation = function () {
    var that = $(this);
    eventHandler = {
        emali: function (emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        },
        phone: function (val) {
            return val.length >= 10 ? phone.match(/^\d+$/) : false;
        },
        remove: function (dv) {
            var att = dv.attr('validate-el');
            $('.' + att).remove();
            dv.removeAttr('validate-el');
            dv.removeClass('validated');
        },
        append: function (dv) {
            var pos = dv.position();
            var width = dv.outerWidth();
            if (dv.hasClass('validated') == false) {
                dv.addClass('validated');
                var att = (new Date).getTime();
                dv.attr('validate-el', att);
                dv.after($('<div/>', { 'text': dv.attr('message'), 'class': att, style: "position:absolute;top:" + pos.top + "px;margin:-4px 0 0 9px;color:red;width:200px;left:" + (pos.left + width) + "px;" }));
            }
            else {
                var att = dv.attr('validate-el');
                $('.' + att).css({ top: pos.top, left: pos.left + width })
            }
        },
        isVlid: true,
        validate: function (t, type) {
            switch (type) {
                case 'required':
                    if (t.val() == '') {
                        if (!t.hasClass('validated')) {
                            eventHandler.append(t);
                            eventHandler.isVlid = false;
                        }
                    } else {
                        eventHandler.remove(t);
                    }
                    break;
                case 'email':
                    if (!eventHandler.emali(t.val())) {
                        eventHandler.append(t);
                        eventHandler.isVlid = false;
                    } else {
                        eventHandler.remove(t);
                    }
                    break;
                case 'compare':
                    break;


            }
        }
    },

     $('[validation]').each(function () {
         var t = $(this);
         var type = t.attr('validation').split(' ');
         $.each(type, function (i, d) {
             eventHandler.validate(t, d);
         });
     });
    return eventHandler.isVlid;

};
