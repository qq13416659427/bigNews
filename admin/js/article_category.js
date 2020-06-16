$(function () {
    function shuaxin() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (backData) {
                if (backData.code == 200) {
                    var reshtml = template('art_cate_temp', backData);
                    $('tbody').html(reshtml);
                }
            },
        });
    };
    shuaxin();

    $('#myModal').on('show.bs.modal', function (e) {
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            $('#OK').text('新增');
            $('#exampleModalLabel').text('新增分类');
            $('#myModal form')[0].reset();
        } else {
            $('#OK').text('编辑');
            $('#exampleModalLabel').text('编辑分类');
            var category_id = $(e.relatedTarget).attr('data-id');
            var control_name = $(e.relatedTarget).parent().prev().prev().text().trim();
            var control_sluge = $(e.relatedTarget).parent().prev().text().trim();
            $('#category_id').val(category_id);
            $('#recipient-name').val(control_name);
            $('#message-text').val(control_sluge);


        }
    }).find('#OK').on('click', function () {
        if ($(this).text() == '新增') {
            var slug = $('#message-text').val().trim();
            var name = $('#recipient-name').val().trim();
            $.ajax({
                type: 'post',
                url: BigNew.category_add,
                data: {
                    name: name,
                    slug: slug,
                },
                success: function (backData) {
                    if (backData.code == 201) {
                        $('#myModal').modal('hide');
                        alert('添加成功');
                        shuaxin();
                    }
                },
            });
        }
        else {
            var id = $('#category_id').val().trim();
            var name = $('#recipient-name').val().trim();
            var slug = $('#message-text').val().trim();
            $.ajax({
                type: 'post',
                url: BigNew.category_edit,
                data: {
                    id: id,
                    name: name,
                    slug: slug,
                },
                success: function (backData) {
                    if (backData.code == 200) {
                        $('#myModal').modal('hide');
                        alert('编辑成功');
                        shuaxin();
                    }
                },
            });
        }

    });
    $('tbody').on('click', '.btn-delete', function () {
        if (confirm("你确定要删除吗?")) {
            //获取要删除的分类id
            var id = $(this).attr("data-id");
            //发送ajax请求完成删除
            $.ajax({
                type: "post",
                url: BigNew.category_delete,
                data: {
                    id: id
                },
                success: function (backData) {
                    //console.log(backData);
                    if (backData.code == 204) {
                        shuaxin();
                    }
                }
            });
        }
    });


})