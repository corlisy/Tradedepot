requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        'fuelux': '//www.fuelcdn.com/fuelux/3.11.0/js/fuelux.min',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery',
        'lodash': '/js/lib/lodash.min',
        'chartjs': '/js/lib/chartjs/Chart.min',
        'chartjshb': '/js/lib/chartjs/Chart.HorizontalBar'
    },
    shim: {
        'bootstrap': {
            deps:['jquery']
        },
        'chartjshb': {
            deps:['chartjs']
        }
    }
});

require(['jquery', 'bootstrap', 'lodash'], function ($, bootstrap, _) {
    $('.spinbox').each(function() {
        $(this).find('.spinbox-down').on('click', function() {
            var v = $(this).parent().find('input.spinbox-input').val();
            if (v > 0) $(this).parent().find('input.spinbox-input').val(--v);
        });
        $(this).find('.spinbox-up').on('click', function() {
            var v = $(this).parent().find('input.spinbox-input').val();
            $(this).parent().find('input.spinbox-input').val(++v);
        });
    });

    $('.fast-search input').on('input', function() {
        var obj = ['Code, Product name, Unit','Product number 2','Long Product number 3','Very, very, very Long Producu...'];
        var res = $(this).parent().find('.fast-search-result');
        $(res).html('');
        _.forEach(obj, function(el) {
            $(res).append('<a href="#" class="fast-search-elem" onclick="return false">'+el+'</a>');
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



    $('#sidebar-toggle').on('click', function() {
        if ($(this).data('toggle')) {
            $('.menu-sidebar').show();
            $('.main-right-col').css('paddingLeft', '230px');
            $(this).data('toggle', false);
        } else {
            $('.menu-sidebar').hide();
            $('.main-right-col').css('paddingLeft', 0);
            $(this).data('toggle', true);
        }
    })
});
