requirejs(['./common'], function (common) {
    require(['jquery', 'bootstrap', 'moment.min','bootstrap-datetimepicker.min'], function ($) {
        $('.datepicker').datetimepicker({format: 'DD MMM YYYY', defaultDate: "11/11/2015"});
    });
});

