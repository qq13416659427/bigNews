$(function () {
    var mypage = 1;
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (backData) {
            if (backData.code == 200) {
                var reshtml = template('art_cate_temp', backData);
                $('#selCategory').html(reshtml);


            }
        },
    });
    function xuanran(callback) {//文章查询封装
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val().trim(),
                state: $('#selStatus').val().trim(),
                page: mypage,
            },
            success: function (backData) {
                var reshtml = template('arti_list', backData);
                $('tbody').html(reshtml);
                console.log(backData.data.data.length);
                console.log(backData);
                console.log(backData.data.totalCount);
                if (backData.data.totalCount != 0 || backData.data.data.length != 0) {
                    $('#pagination-demo').show().next('p').hide();
                }
                else {
                    $('#pagination-demo').hide().next('p').show();
                }
                callback(backData);
            },
        });
    };


    xuanran(function (backData) {
        $('#pagination-demo').twbsPagination({//一开始的分页设计；
            totalPages: backData.data.totalPage,
            visiblePages: 5,
            onPageClick: function (event, page) {
                mypage = page;
                $.ajax({
                    type: 'get',
                    url: BigNew.article_query,
                    data: {
                        type: $('#selCategory').val().trim(),
                        state: $('#selStatus').val().trim(),
                        page: mypage,
                    },
                    success: function (backData) {
                        var reshtml = template('arti_list', backData);
                        $('tbody').html(reshtml);
                    },
                });
            }
        });

    });
    $('#btnSearch').on('click', function (e) {//筛选点击事件函数
        e.preventDefault();//删除默认事件（form表单内的btn有submit默认事件），防止页面刷新
        mypage = 1;//修改当前页码变量为1
        xuanran(function (backData) {
            $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, 1);//修改当前页码为1
        })
    });
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: $(this).attr('data-id'),
            },
            success: function (backData) {
                if (backData.code == 204) {
                    xuanran(function (backData) {
                        if (backData.data.totalPage < mypage) {
                            mypage--;
                            $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, mypage);
                        }
                        else {
                            $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, mypage);
                        }
                    });
                }
            },
        });
    })

})