$(function () {
    $('.logout').on('click', function () {
        alert('账号已登出');
        localStorage.removeItem('token');
        location.href = './login.html';
    });

    $.ajax({
        type: 'get',
        url: BigNew.user_info,
        success: function (backData) {
            console.log(backData);
            $('.user_info img').attr('src', backData.data.userPic).next().find('i').text(backData.data.nickname);
            $('.user_center_link img').attr('src', backData.data.userPic);
        },
    });
    $('.menu div').on('click', function (e) {
        e.stopPropagation();
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.menu .level01:eq(1) a').on('click', function (e) {
        $('.level02').slideToggle("slow");
        console.log($('.level01:eq(1) b').css('transform'));

        if ($('.level01:eq(1) b').attr('flag') == 1) {
            $('.level01:eq(1) b').css('transform', 'rotate(90deg)');
            $('.level01:eq(1) b').attr('flag', 0);
        }
        else {
            $('.level01:eq(1) b').attr('flag', 1);
            $('.level01:eq(1) b').css('transform', 'rotate(0deg)');
        }

    });
    $('.level02 li').on('click', function () {
        $(this).find('span').css('color', 'orange');
        $(this).siblings().find('span').css('color', '#fff');
    })

})