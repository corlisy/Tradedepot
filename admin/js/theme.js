requirejs(['./common'], function (common) {
    require(['jquery', 'minicolors', 'bootstrap', 'moment.min', 'bootstrap-datetimepicker.min'], function ($) {
        'use strict';

        $('INPUT.minicolors').minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            format: $(this).attr('data-format') || 'hex',
            keywords: $(this).attr('data-keywords') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function(value, opacity) {
                if( !value ) return;
                if( opacity ) value += ', ' + opacity;
                if( typeof console === 'object' ) {
                    console.log(value);
                }
            },
            theme: 'bootstrap'
        });


        $('.datepicker').datetimepicker({format: 'DD MMM YYYY', defaultDate: "11/11/2015"});


    });
});

