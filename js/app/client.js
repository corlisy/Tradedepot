requirejs(['./main'], function (common) {
    require([
        'text!/client/header.html',
        'text!/client/footer.html',
        'text!/client/header_noauth.html',
        'jquery',
        'bootstrap',
        'lodash',
        'owl',
        'moment.min',
        'bootstrap-datetimepicker.min',
        'chartjs',
        'chartjshb',
        'sweetalert',
        'masonry'
    ], function (header, footer, header_noauth, $, bootstrap, _, owl) {

        if ($('.masonry-container').length) {
            var $container = $('.masonry-container');
            $container.imagesLoaded( function () {
                $container.masonry({
                    columnWidth: '.item',
                    itemSelector: '.item'
                });
            });
        }
        $('.datepicker').datetimepicker({format: 'DD MMM YYYY', defaultDate: "11/11/2015"});

        $('#header').on('input propertychange', '#q', function() {
            if ($(this).val() != '') {
                $('#resetSearch').show();
            } else {
                $('#resetSearch').hide();
            }
        });

        $('#header').on('click', '#resetSearch', function() {
            $('#q').val('');
            $(this).hide();
        });

        if ($('#footer').length) {
            $('#footer').append(_.template(footer, {}));
        }
        if ($('#header').length) {
            $('#header').append(_.template(header, {}));
        }
        setTimeout(function() {
            $('body').css({'visibility': 'visible', 'opacity': '1'});
        }, 30);

        if ($('#header_noauth').length) {
            $('#header_noauth').append(_.template(header_noauth, {}));
        }

        $('table input[type="checkbox"]').on('change', function() {
            if ($('table input[type="checkbox"]:checked').length) {
                $('.returnSelect').removeClass('disabled');
            } else {
                $('.returnSelect').addClass('disabled');
            }
        });



        $('.carousel').carousel({
            interval: 4000
        });

        var owl;
        $(document).ready(function () {
            owl = $("#owl-demo");
            owl.owlCarousel({
                navigation: false, // Show next and prev buttons
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                afterInit: afterOWLinit // do some work after OWL init
            });

            function afterOWLinit() {
                // adding A to div.owl-page
                $('.owl-controls .owl-page').append('<a class="item-link" href="#"/>');
                var pafinatorsLink = $('.owl-controls .item-link');
                /**
                 * this.owl.userItems - it's your HTML <div class="item"><img src="http://www.ow...t of us"></div>
                 */
                $.each(this.owl.userItems, function (i) {
                    $(pafinatorsLink[i])
                        // i - counter
                        // Give some styles and set background image for pagination item
                        .css({
                            'background': 'url(' + $(this).find('img').attr('src') + ') center center no-repeat',
                            '-webkit-background-size': 'cover',
                            '-moz-background-size': 'cover',
                            '-o-background-size': 'cover',
                            'background-size': 'cover'
                        })
                        // set Custom Event for pagination item
                        .click(function () {
                            owl.trigger('owl.goTo', i);
                        });
                });
                // add Custom PREV NEXT controls
                $('.owl-pagination').prepend('<a href="#prev" class="prev-owl"/>');
                $('.owl-pagination').append('<a href="#next" class="next-owl"/>');
                // set Custom event for NEXT custom control
                $(".next-owl").click(function () {
                    owl.trigger('owl.next');
                });
                // set Custom event for PREV custom control
                $(".prev-owl").click(function () {
                    owl.trigger('owl.prev');
                });

                function getWidth() {
                    width='inherit';
                    width_parent = $('#owl-demo').width();

                    if (width_parent > 0) {
                        width = width_parent - $('#owl-demo .owl-controls').width() - 20;
                    }

                    return width
                }

                $('.owl-carousel .owl-wrapper-outer').css('width', getWidth())
            }

            // ---------- Chart ----------------
            var rndSF = function() {
                return Math.round(Math.random()*500);
            };

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

            if ($("#depositsPie_hedaer").length) {
                var depositsPieChart = new Chart($("#depositsPie_hedaer").get(0).getContext("2d"));
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
                new Chart(document.getElementById("depositsLine_hedaer").getContext("2d")).Line(depositsBarChartData, depositsLineOptions);
                //======================
            }

            if ($("#rebatesPie_hedaer").length) {
                var rebatesPieChart = new Chart($("#rebatesPie_hedaer").get(0).getContext("2d"));
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


                new Chart(document.getElementById("rebatesLine_hedaer").getContext("2d")).Line(rebatesBarChartData, rebatesLineOptions);
                //======================
            }

            if ($("#creditsPie_hedaer").length) {
                var creditsPieChart = new Chart($("#creditsPie_hedaer").get(0).getContext("2d"));
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
                new Chart(document.getElementById("creditsLine_hedaer").getContext("2d")).Line(creditsBarChartData, depositsLineOptions);
                // --------------------------------
            }
            $('.user_menu_block').css('opacity', '1');
            $('.user_menu_block').removeClass('open');

            /*======= BALANCE PAGE ========*/


            if ($("#transactionsChart").length) {
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
                    showScale: true,
                    scaleShowGridLines: true,
                    scaleGridLineColor: "rgba(0,0,0,.05)",
                    scaleGridLineWidth: 1,
                    scaleShowHorizontalLines: true,
                    scaleShowVerticalLines: false,
                    bezierCurve: true,
                    bezierCurveTension: 0,
                    pointDot: true,
                    pointDotRadius: 3,
                    pointDotStrokeWidth: 2,
                    pointHitDetectionRadius: 5,
                    datasetStroke: true,
                    datasetStrokeWidth: 2,
                    datasetFill: true,
                    legendTemplate: "<ul class=\"list-unstyled list-inline <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"icon-circle\" style=\"color:<%=datasets[i].strokeColor%>\"></span>&nbsp;<%=datasets[i].label%></li><%}%></ul>",
                    maintainAspectRatio: true,
                    responsive: true
                };
                var salesChart = new Chart(salesChartCanvas).Line(salesChartData, salesChartOptions);
                document.getElementById('transactionsChartLegend').innerHTML = salesChart.generateLegend();
            }

            if ($("#depositsPie1").length) {
                var depositsPieData1 = [
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
                new Chart($("#depositsPie1").get(0).getContext("2d")).Doughnut(depositsPieData1, depositsPieOptions);
            }
            //------------------
            if ($("#depositsLine1").length) {
                var depositsBarChartData1 = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "Orders",
                            fillColor: "#e6f5d7",
                            strokeColor: "#669933",
                            highlightFill: "transparent",
                            highlightStroke: "transparent",
                            pointColor: "transparent",
                            pointStrokeColor: "transparent",
                            pointHighlightFill: "#f07e2c",
                            pointHighlightStroke: "#fff",
                            data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                        }
                    ]
                };
                var depLineOptions = depositsLineOptions;
                depLineOptions['customTooltips'] =  function(tooltip) {
                    customTooltip(tooltip, 'chartjs-tooltip-deposits1')
                };
                new Chart(document.getElementById("depositsLine1").getContext("2d")).Line(depositsBarChartData1, depLineOptions);
            }
            //======================
            if ($("#rebatesPie1").length) {
                var rebatesPieData1 = [
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
                new Chart($("#rebatesPie1").get(0).getContext("2d")).Doughnut(rebatesPieData1, depositsPieOptions);
            }
            //------------------
            if ($("#rebatesLine1").length) {
                var rebatesBarChartData1 = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "Orders",
                            fillColor: "#e1edf6",
                            strokeColor: "#0099cc",
                            highlightFill: "transparent",
                            highlightStroke: "transparent",
                            pointColor: "transparent",
                            pointStrokeColor: "transparent",
                            pointHighlightFill: "#f07e2c",
                            pointHighlightStroke: "#fff",
                            data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                        }
                    ]
                };
                var rebatesLineOptions1 = depositsLineOptions;
                rebatesLineOptions1['customTooltips'] =  function(tooltip) {
                    customTooltip(tooltip, 'chartjs-tooltip-rebates1')
                };
                new Chart(document.getElementById("rebatesLine1").getContext("2d")).Line(rebatesBarChartData1, rebatesLineOptions1);
            }
            //======================
            if ($("#creditsPie1").length) {
                var creditsPieData1 = [
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
                new Chart($("#creditsPie1").get(0).getContext("2d")).Doughnut(creditsPieData1, depositsPieOptions);
            }
            //------------------
            if ($("#creditsLine1").length) {
                var creditsBarChartData1 = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "Orders",
                            fillColor: "#f2ded0",
                            strokeColor: "#f07e2c",
                            highlightFill: "transparent",
                            highlightStroke: "transparent",
                            pointColor: "transparent",
                            pointStrokeColor: "transparent",
                            pointHighlightFill: "#f07e2c",
                            pointHighlightStroke: "#fff",
                            data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                        }
                    ]
                };
                var creditsLineOptions1 = depositsLineOptions;
                creditsLineOptions1['customTooltips'] = function (tooltip) {
                    customTooltip(tooltip, 'chartjs-tooltip-credits1')
                };
                new Chart(document.getElementById("creditsLine1").getContext("2d")).Line(creditsBarChartData1, creditsLineOptions1);
            }
            //======================
            if ($("#ordersBar1").length) {
                var ordersChartData = {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [
                        {
                            fillColor: "rgba(48,145,213,1)",
                            strokeColor: "rgba(151,187,205,0.8)",
                            highlightFill: "rgba(48,145,213,0.5)",
                            highlightStroke: "rgba(151,187,205,1)",
                            data: [rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF(), rndSF()]
                        }
                    ]
                };
                var chart = new Chart(document.getElementById("ordersBar1").getContext("2d")).Bar(ordersChartData, {
                    responsive: true,
                    barShowStroke: false,
                    showTooltips: true,
                    scaleShowHorizontalLines: false,
                    scaleShowVerticalLines: false,
                    scaleGridLineWidth: 1,
                    barStrokeWidth: 2,
                    barValueSpacing: 1,
                    barDatasetSpacing: 1,

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
                    customTooltips: function (tooltip) {
                        customTooltip(tooltip, 'chartjs-tooltip-orders')
                    }
                });
            }


            if ($('#hbChart').length) {
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
            }

            if ($(".returnSelect").length) {
                $(".returnSelect").on('click', function() {
                    if (!$(this).hasClass('disabled')) {
                        swal('Good job!', '', 'success');
                    }
                });
            }

        });

    });
});


