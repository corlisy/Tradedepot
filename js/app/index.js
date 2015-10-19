requirejs(['./main'], function (common) {
    require(['jquery', 'bootstrap', 'jquery.spritely'], function ($) {
        var startAnimation = function(form) {
            $('#animation').sprite({
                fps: 30,
                no_of_frames: 191,
                on_last_frame: function(obj) {
                    obj.spStop();
                    $(form).submit();
                },
                on_frame: {
                    40: function(obj) {
                        obj.spStop();
                    }
                }
            });
        };
        var signInOk = function () {
            $('#animation').spStart();
        };

        $('#signin').on('show.bs.modal', function (e) {
            startAnimation($('#signin form'));
        });
        $('.modal#signin button[type=submit]').on('click', function() {
            signInOk();
            return false;
        });


    });
});

