$(function () {

    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (backData) {
            console.log(backData);
            $('.user_pic').attr('src', backData.data.userPic);
            $('.username').val(backData.data.username);
            $('.nickname').val(backData.data.nickname);
            $('.email').val(backData.data.email);
            $('.password').val(backData.data.password);
        },
    });

    $.ajax({
        type: 'post',
        url: BigNew.user_edit,
        data: {
            
        },
        success: function (backData) {

        },
    });

})