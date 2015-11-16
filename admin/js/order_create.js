requirejs(['./common'], function (common) {
    require(['jquery', 'bootstrap', 'moment.min', 'bootstrap-datetimepicker.min', 'lodash'], function ($) {
        $('.fast-search input').on('input', function() {
            var obj = [
                ['Code, Product name, Unit', '$570', '320'],
                ['Product number 2', '$450', '56'],
                ['Long Product number 3', '$943', '3'],
                ['Very, very, very Long Producu...', '$883', '87']];
            var res = $(this).parent().find('.fast-search-result');
            $(res).html('');
            _.forEach(obj, function(el) {
                $(res).append('' +
                    '<div class="fast-search-elem" onclick="return false"><div>' +
                    '<div class="col-sm-10 n-side-padding">' +
                    el[0]+
                    '</div>' +
                    '<div class="col-sm-1 n-side-padding fs11 text-right">' +
                    el[1]+
                    '</div>' +
                    '<div class="col-sm-1 n-side-padding fs11 text-right">' +
                    '<span class="badge text-muted">'+el[2]+'</span>'+
                    '</div>' +
                    '<div class="clearfix"></div>' +
                    '</div></div><div class="clearfix"></div>'
                );
            });
            $(res).show();
        });

        $('.fast-search input').on('blur', function() {
            setTimeout(function() {
                $('.fast-search-result').hide();
            }, 100);

        });


        $('.fast-search').on('click', 'a.fast-search-elem', function() {
            $(this).parent().parent().find('input').val($(this).text());
            $(this).parent().hide();
        });

        $('.datepicker').datetimepicker({format: 'DD MMM YYYY', defaultDate: "11/11/2015" });
    });
});

