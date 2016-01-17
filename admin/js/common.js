requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'bootstrap': 'bootstrap.min',
        'fuelux': 'fuelux.min',
        'jquery': 'jQuery-2.1.4.min',
        'lodash': 'lodash.min',
        'chartjs': 'chartjs/Chart.min',
        'sweetalert': '/js/lib/sweetalert.min',
        'chartjshb': 'chartjs/Chart.HorizontalBar',
        'minicolors': 'jquery.minicolors.min'
    },
    shim: {
        'bootstrap': {
            deps:['jquery']
        },
        'chartjshb': {
            deps:['chartjs']
        },
        'minicolors': {
            deps:['jquery']
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

    $('.panel-checkbox-color input[type=checkbox]').each(function() {
        if (this.checked) {
            $(this).parents('.panel-checkbox-color ').addClass('panel-success');
        } else {
            $(this).parents('.panel-checkbox-color ').removeClass('panel-success');
        }
    });

    $('.panel-checkbox-color input[type=checkbox]').on('change', function() {
        if (this.checked) {
            $(this).parents('.panel-checkbox-color ').addClass('panel-success');
        } else {
            $(this).parents('.panel-checkbox-color ').removeClass('panel-success');
        }
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
            $('body').removeClass('sidebar-mini');
            /*
            $('.menu-sidebar').show();
            $('.main-right-col').css('paddingLeft', '230px').removeClass('sidebar-hidden');
            $('.top-menu').css('marginLeft', '230px');
            */
            $(this).data('toggle', false);
        } else {
            $('body').addClass('sidebar-mini');
            /*
            $('.menu-sidebar').hide();
            $('.main-right-col').css('paddingLeft', 0).addClass('sidebar-hidden');
            $('.top-menu').css('marginLeft', 0);
            */
            $(this).data('toggle', true);
        }
    });

    $('#settings-menu').on('click', function() {
        if ($(this).data('toggle')) {
            $('.menu-sidebar-second').hide();
            $(this).data('toggle', false);
        } else {
            $('.menu-sidebar-second').show();
            $(this).data('toggle', true);
        }
        return false;
    });

    $('.btn-label').on('click', function() {
        var text = $(this).text(),
            id = $(this).data('id'),
            last = $('#filter-selected span:last-child');


        if ($(this).hasClass('active')) {
            $('#filter-selected').find("[data-id='" + id + "']").remove();
            last = $('#filter-selected span:last-child');
            if (last.text()[last.text().length-1] == ',') {
                $(last).text(last.text().slice(0, last.text().length-1));
            }
        } else {
            var el = $('<span data-id="'+id+'"></span>').text(text);
            if (last.text()[last.text().length-1] != ',') {
                $(last).text(last.text() + ',');
            }
            $('#filter-selected').append(el);
        }
        if ($('#filter-selected:empty').length) {
            $('.empty-filter').show();
        } else {
            $('.empty-filter').hide();
        }

    });
});
