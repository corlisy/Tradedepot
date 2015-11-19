requirejs(['./common'], function (common) {
    require(['jquery', 'bootstrap', 'moment.min', 'bootstrap-datetimepicker.min', 'chartjs', 'chartjshb'], function ($) {
        'use strict';
        $('.datepicker').datetimepicker({format: 'DD MMM YYYY', defaultDate: "11/11/2015"});

        var rndSF = function() {
            return Math.round(Math.random()*500);
        };

        var salesChartCanvas = $("#transactionsChart").get(0).getContext("2d");
        var salesChartData = {
            labels: ["Sep 03", "Sep 04", "Sep 05", "Sep 06", "Sep 07", "Sep 08", "Sep 09", "Sep 10", "Sep 11", "Sep 12", "Sep 13", "Sep 14"],
            datasets: [
                {
                    label: "Deposits",
                    fillColor: "transparent",
                    strokeColor: "#669933",
                    pointColor: "#669933",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgb(224, 241, 247)",
                    pointHighlightStroke: "#fff",
                    data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                },
                {
                    label: "Rebates",
                    fillColor: "transparent",
                    strokeColor: "rgb(25, 163, 209)",
                    pointColor: "rgb(25, 163, 209)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgb(224, 241, 247)",
                    pointHighlightStroke: "#fff",
                    data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                },
                {
                    label: "Credits",
                    fillColor: "transparent",
                    strokeColor: "#f07e2c",
                    pointColor: "#f07e2c",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgb(224, 241, 247)",
                    pointHighlightStroke: "#fff",
                    data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                }
            ]
        };
        var salesChartOptions = {
            //Boolean - If we should show the scale at all
            showScale: true,
            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,
            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",
            //Number - Width of the grid lines
            scaleGridLineWidth: 1,
            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,
            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: false,
            //Boolean - Whether the line is curved between points
            bezierCurve: true,
            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0,
            //Boolean - Whether to show a dot for each point
            pointDot: true,
            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,
            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,
            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 5,
            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,
            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,
            //Boolean - Whether to fill the dataset with a color
            datasetFill: true,
            //String - A legend template
            legendTemplate: "<ul class=\"list-unstyled list-inline <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"icon-circle\" style=\"color:<%=datasets[i].strokeColor%>\"></span>&nbsp;<%=datasets[i].label%></li><%}%></ul>",
            //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,
            //Boolean - whether to make the chart responsive to window resizing
            responsive: true
        };

        var salesChart = new Chart(salesChartCanvas).Line(salesChartData, salesChartOptions);
        document.getElementById('transactionsChartLegend').innerHTML = salesChart.generateLegend();



        var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets : [
                {
                    label: "Orders",
                    fillColor : "#e1edf6",
                    strokeColor : "#079ccd",
                    highlightFill : "transparent",
                    highlightStroke : "transparent",
                    pointColor: "transparent",
                    pointStrokeColor: "transparent",
                    pointHighlightFill: "#f07e2c",
                    pointHighlightStroke: "#fff",
                    data : [rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF()]
                }
            ]
        };

        var ctx = document.getElementById("hbChart").getContext("2d");
        new Chart(ctx).Line(barChartData, {
            showScale: false,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: false,
            scaleShowVerticalLines: false,
            bezierCurve: false,
            bezierCurveTension: 0,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 5,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            legendTemplate: "<ul class=\"list-unstyled list-inline <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"icon-circle\" style=\"color:<%=datasets[i].strokeColor%>\"></span>&nbsp;<%=datasets[i].label%></li><%}%></ul>",
            maintainAspectRatio: true,
            responsive: true
        });




        function customTooltip (tooltip, tooltipid) {
            var tooltipEl = $('#' + tooltipid);
            if (!tooltip) {
                tooltipEl.css({
                    opacity: 0
                });
                return;
            }
            tooltipEl.removeClass('above below');
            tooltipEl.addClass(tooltip.yAlign);
            var innerHtml = '';
            innerHtml += [
                '<div class="chartjs-tooltip-section">',
                '	<span class="chartjs-tooltip-value">' + tooltip.text + '</span>',
                '</div>'
            ].join('');
            tooltipEl.html(innerHtml);
            tooltipEl.css({
                opacity: 1,
                left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
                fontFamily: tooltip.fontFamily,
                fontSize: tooltip.fontSize,
                fontStyle: tooltip.fontStyle
            });
        }


        var depositsPieOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            scaleStepWidth: 500,
            segmentStrokeWidth: 1,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: false,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: false,
            showTooltips: false
        };
        var depositsLineOptions = {
            showScale: false,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: false,
            scaleShowVerticalLines: false,
            bezierCurve: false,
            bezierCurveTension: 0,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 5,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            maintainAspectRatio: true,
            responsive: true,
            showTooltips: true,
            customTooltips:
                function(tooltip) {
                    customTooltip(tooltip, 'chartjs-tooltip-deposits')
                }
        };


        var depositsPieChart = new Chart($("#depositsPie").get(0).getContext("2d"));
        var depositsPieData = [
            {
                value: 700,
                color: "#669933",
                highlight: "#669933",
                label: "DEPOSITS"
            },
            {
                value: 100,
                color: "#d4d4d4",
                highlight: "#d4d4d4",
                label: "other"
            }
        ];
        depositsPieChart.Doughnut(depositsPieData, depositsPieOptions);
        //------------------
        var depositsBarChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets : [
                {
                    label: "Orders",
                    fillColor : "#e6f5d7",
                    strokeColor : "#669933",
                    highlightFill : "transparent",
                    highlightStroke : "transparent",
                    pointColor: "transparent",
                    pointStrokeColor: "transparent",
                    pointHighlightFill: "#f07e2c",
                    pointHighlightStroke: "#fff",
                    data : [rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF()]
                }
            ]
        };
        new Chart(document.getElementById("depositsLine").getContext("2d")).Line(depositsBarChartData, depositsLineOptions);
        //======================

        var rebatesPieChart = new Chart($("#rebatesPie").get(0).getContext("2d"));
        var rebatesPieData = [
            {
                value: 700,
                color: "#0099cc",
                highlight: "#0099cc",
                label: "rebates"
            },
            {
                value: 100,
                color: "#d4d4d4",
                highlight: "#d4d4d4",
                label: "other"
            }
        ];
        rebatesPieChart.Doughnut(rebatesPieData, depositsPieOptions);
        //------------------
        var rebatesBarChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets : [
                {
                    label: "Orders",
                    fillColor : "#e1edf6",
                    strokeColor : "#0099cc",
                    highlightFill : "transparent",
                    highlightStroke : "transparent",
                    pointColor: "transparent",
                    pointStrokeColor: "transparent",
                    pointHighlightFill: "#f07e2c",
                    pointHighlightStroke: "#fff",
                    data : [rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF()]
                }
            ]
        };

        var rebatesLineOptions = depositsLineOptions;
        rebatesLineOptions['customTooltips'] =  function(tooltip) {
            customTooltip(tooltip, 'chartjs-tooltip-rebates')
        };


        new Chart(document.getElementById("rebatesLine").getContext("2d")).Line(rebatesBarChartData, rebatesLineOptions);
        //======================

        var creditsPieChart = new Chart($("#creditsPie").get(0).getContext("2d"));
        var creditsPieData = [
            {
                value: 100,
                color: "#f07e2c",
                highlight: "#f07e2c",
                label: "credits"
            },
            {
                value: 500,
                color: "#d4d4d4",
                highlight: "#d4d4d4",
                label: "other"
            }
        ];

        var creditsLineOptions = depositsLineOptions;
        creditsLineOptions['customTooltips'] =  function(tooltip) {
            customTooltip(tooltip, 'chartjs-tooltip-credits')
        };

        creditsPieChart.Doughnut(creditsPieData, creditsLineOptions);
        //------------------
        var creditsBarChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets : [
                {
                    label: "Orders",
                    fillColor : "#f2ded0",
                    strokeColor : "#f07e2c",
                    highlightFill : "transparent",
                    highlightStroke : "transparent",
                    pointColor: "transparent",
                    pointStrokeColor: "transparent",
                    pointHighlightFill: "#f07e2c",
                    pointHighlightStroke: "#fff",
                    data : [rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF()]
                }
            ]
        };
        new Chart(document.getElementById("creditsLine").getContext("2d")).Line(creditsBarChartData, depositsLineOptions);
        //======================




        var ordersChartData = {
            labels : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets : [
                {
                    fillColor : "rgba(48,145,213,1)",
                    strokeColor : "rgba(151,187,205,0.8)",
                    highlightFill : "rgba(48,145,213,0.5)",
                    highlightStroke : "rgba(151,187,205,1)",
                    data : [rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF(),rndSF()]
                }
            ]
        };

        var chart = new Chart(document.getElementById("ordersBar").getContext("2d")).Bar(ordersChartData, {
            responsive: true,
            barShowStroke: false,
            showTooltips: true,
            scaleShowHorizontalLines: false,
            scaleShowVerticalLines: false,
            scaleGridLineWidth: 1,
            barStrokeWidth : 2,
            barValueSpacing : 1,
            barDatasetSpacing : 1,

            showScale: false,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",

            bezierCurve: false,
            bezierCurveTension: 0,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 5,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            maintainAspectRatio: true,
            customTooltips: function(tooltip) {
                customTooltip(tooltip, 'chartjs-tooltip-orders')
            }
        });



    });
});

