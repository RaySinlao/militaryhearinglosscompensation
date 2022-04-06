$(document).ready(function() {

    $('.stepbox button').click(next);

    var $timer = $('.final-box h5 span');
    var timer = 120;
    var interval = 0;

    function startTimer() {
        if (timer < 1) clearInterval(interval);

        var getSeconds = timer % 60;
        var seconds = getSeconds < 10 ? "0" + getSeconds : getSeconds
        $timer.text(Math.floor(timer / 60) + ':' + seconds);

        timer--;
    };

    function working() {
        var self = $(this);
        var next = $(this).next('.popup');

        $('.hideme').hide();

        if (next.length) {
            setTimeout(function() {
                self.fadeOut(function() {
                    next.fadeIn(working);
                });
            }, 500);
        } else {
            $('.progress > span').text('100% Complete');
            $('.progress .bar span').css({ width: '100%' });
        }

        if (!interval) {
            interval = setInterval(startTimer, 1000);
        }
    }


    $steps = $('.stepbox');

    function next(e) {
        e.preventDefault();
        var parent = $(this).parents('.stepbox');
        var next = parent.next('.stepbox');

        $('.progress').css({ display: '' });

        parent.fadeOut(function() {
            if (next.length) {
                next.fadeIn();

                if (next.data('progress')) {
                    var progress = parseInt(next.data('progress'));
                } else {
                    var progress = 100 / $steps.length * (next.index() - $steps.first().index());
                }

                $('.progress > span').text(Math.round(progress) + '% Complete');
                $('.progress .bar span').css({ width: progress + '%' });

                return;
            }

            $('.popup').first().fadeIn(working);
        });
    }


});