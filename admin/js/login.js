$(function () {
    $('.input_sub').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var name = $('.input_txt').val().trim();
        var password = $('.input_pass').val().trim();
        if (name == '' || password == '') {
            $("#myModal .modal-body").text("账号和密码不能为空!");
            $("#myModal").modal();
            return;
        }
        else {
            $.ajax({
                type: 'post',
                url: 'http://localhost:8080/api/v1/admin/user/login',
                data: {
                    username: name,
                    password: password,
                },
                success: function (backData) {
                    console.log(backData);
                    $("#myModal .modal-body").text(backData.msg);
                    $("#myModal").modal();
                    if (backData.code == 200) {
                        window.localStorage.setItem("token", backData.token);

                        //此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
                        $("#myModal").on("hidden.bs.modal", function (e) {
                            window.location.href = "./index.html";
                        });
                    }
                },
            });
        }
    });
})