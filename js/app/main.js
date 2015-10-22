requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        'fuelux': '//www.fuelcdn.com/fuelux/3.11.0/js/fuelux.min',
        'googlejs': 'https://www.google.com/jsapi?callback=',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery',
        'lodash': '/js/lib/lodash.min',
        'owl': '/js/lib/owl.carousel.min',
        'jquery.spritely': '/js/lib/jquery.spritely',
        'jQuery.tipsy': '/js/lib/jquery.tipsy',
        'bootstrap-multiselect': '/js/lib/bootstrap-multiselect'
    },
    shim: {
        'bootstrap': {
            deps:['jquery']
        },
        'bootstrap-multiselect' : {
            deps:['bootstrap']
        },
        'owl': {
            deps:['jquery']
        },
        'jquery.spritely': {
            deps:['jquery']
        },
        'jquery.tipsy': {
            deps:['jquery']
        }
    }
});

require(['jquery', 'bootstrap', 'jquery.spritely', 'jquery.tipsy', 'bootstrap-multiselect'], function ($, bootstrap) {
    $('.nav a').on('click', function(){
        var menu = $(this).parents('.navbar-collapse');
        if ($(menu).hasClass('collapsing') || $(menu).hasClass('in')) {
            console.log($(menu));
            $('.navbar-toggle').click();
        }
    });

    var startAnimation = function(form) {
        try {
            $('#animation').spStart();
        } catch (e) {
            $('#animation').sprite({
                fps: 30,
                no_of_frames: 191,
                on_last_frame: function(obj) {
                    obj.spStop();
                    $(form).submit();
                    //$('#signin').modal('hide');
                },
                on_frame: {
                    39: function(obj) {
                        obj.spStop();
                    }
                }
            });
        }
    };
    var signInOk = function () {
        $('#animation').spStart();
        $('#animation').fps(100);
    };

    $('#signin').on('show.bs.modal', function (e) {
        startAnimation($('#signin form'));
    });

    $('#signin').on('hide.bs.modal', function (e) {
        try {
            $('#animation').destroy();
        } catch (e) {
            //
        }
    });

    $('#myWizard').on('changed.fu.wizard', function (e, data) {
        try {
            if (data['step'] == 3) {
                $('#myWizard .actions div').hide();
                $('#myWizard').on('stepclicked.fu.wizard', function (evt, data) {
                    evt.preventDefault();
                });
            }
        } catch (e) {
            //
        }

        console.log(data);
    });

    $('.modal#signin button[type=submit]').on('click', function() {
        signInOk();
        return false;
    });

    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $(function () {
        var template = '<div class="tooltip error right" role="tooltip">'+
            '<div class="tooltip-arrow"></div>'+
            '<div class="tooltip-inner">'+
            '</div>'+
            '</div>';
        var options = {
            'template': template
        };
        $('[data-toggle="tooltip_error"]').tooltip(options);
        $('[data-toggle="tooltip_error"]').tooltip('show');
    });
    $(function () {
        $('select[multiple="multiple"]').multiselect({
            numberDisplayed: 90,
            maxHeight: 254,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            buttonWidth: '100%',
            buttonClass: 'form-control btn',
            templates: {
                filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search"type="text"></div></li>',
                li: '<li><a href="javascript:void(0);" class="li_multiselect-item"><label></label></a></li>',
            },
            filterPlaceholder: 'Search...'

        })
    });

});
