requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        'fuelux': '//www.fuelcdn.com/fuelux/3.11.0/js/fuelux.min',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery',
        'lodash': '/js/lib/lodash.min',
        'chartjs': '/js/lib/chartjs/Chart.min'
    },
    shim: {
        'bootstrap': {
            deps:['jquery']
        }
    }
});

require(['jquery', 'bootstrap'], function ($, bootstrap) {

});
