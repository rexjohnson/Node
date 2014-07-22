var elements = {
    root: null,
    home: null,
    createuser: null,
    doc: null,
    users: null,
}
var eventHandler = {
    load_users: function () {
        $.post('/getusers', function (data) {
            eventHandler.append(data);
            elements.users = data;
        });
    },
    append: function (data) {
        var table = $('<table/>');
        elements.root.find('#users').html(table);
        var thead = $('<thead><tr><th>Name</th><th>Enail</th><th>Registration Date</th><th>Phone</th></tr></thead>');
        table.append(thead);
        var tbody = $('<tbody/>');
        table.append(tbody);

        if (data.length > 0) {
            $.each(data, function (i, d) {
                var anchor = $("<a rel='" + d.id + "' class='show-modal-popup' href='javascript:;'>" + d.first_name + " " + d.last_name + "</a>");
                var tr = $("<tr><td></td><td>" + d.email + "</td><td>" + new Date(d.create_on).formatDate() + "</td><td>" + d.phone + "</td></tr>");
                tbody.append(tr)
                tr.find('td:first-child').append(anchor);
                anchor.click(eventHandler.user_detail);
            });
            table.dataTable({ "iDisplayLength": 5 });
            $('.dataTables_length select').prepend('<option selected="selected" value="5">5</option>');
        }
        else {
            tbody.append("<tr><td>Files not found on server.</td><td></td><td></td><td></td></tr>");
            table.dataTable({ "iDisplayLength": 5 });
            $('.paging_simple_numbers,.dataTables_length,.dataTables_filter,.dataTables_info').hide();

        }
    },
    userlist_OnClick: function () {
        if (!$(this).hasClass('active')) {
            eventHandler.load_users();
            $('.nav li a').removeClass('active');
            $(this).addClass('active');
        }
    },
    create_OnClick: function () {

    },
    user_detail: function () {
        var id = $(this).attr('rel');
        //var user = eventHandler.get(id);
        //alert(JSON.stringify(user[0]));
        window.location.href = "/admin/userdetail/" + id
    },
    //getUsers: function () {
    //    return elements.users;
    //},
    //get: function (id) {
    //    return elements.users.filter(function (d) { return d.id == id });
    //}
}
var init = function () {
    elements.root = $('#root');
    elements.home = $('#btnlist');
    elements.createuser = $('#btnCreate');
    elements.home.click(eventHandler.userlist_OnClick);
    elements.createuser.click(eventHandler.create_OnClick);
    eventHandler.load_users();
    $('.nav li:first-child a').addClass('active');
    elements.doc = $(document);
    // $('.show-modal-popup').click(eventHandler.user_detail);
}

$(function () {
    init();
});



var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
Date.prototype.formatDate = function () {
    return (this.getDate() + ' ' + monthNames[this.getMonth()] + ', ' + this.getFullYear());
};

