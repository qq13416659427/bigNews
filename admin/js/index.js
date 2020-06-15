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
})