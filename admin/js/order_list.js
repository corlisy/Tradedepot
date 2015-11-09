requirejs(['./common'], function (common) {
    require(['jquery', 'bootstrap', 'sweetalert'], function ($) {
        $("head").append($("<link rel='stylesheet' href='/css/lib/sweetalert.css'>"));
        $("head").append($("<link rel='stylesheet' href='/css/lib/sweetalert_tpl.css'>"));
        $('button.returnSelect').click(function(e) {
            swal({
                title: "Why are you returning this?",
                html: true,
                text: "<p>Sub additional text</p>" +
                "<select class='form-control'>" +
                "<option>The item is spoilt/defective</option>" +
                "<option>The wrong item was delivered</option>" +
                "<option>Arrived in addition to what was ordered</option>" +
                "<option>Missed estimated delivery date</option>" +
                "<option>Ordered the wrong SKU</option>" +
                "</select>",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-success",
                closeOnConfirm: false
            }, function(selected) {
                if (selected != "") {
                    window.location.href = '/admin/views/return.html';
                }
            });

            return false;
        });
    });
});

