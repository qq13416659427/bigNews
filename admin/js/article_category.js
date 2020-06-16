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
        } else {
            $('#OK').text('编辑');
            $('#exampleModalLabel').text('编辑分类');
            
        }
    }).find('#OK').on('click', function () {
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
                    shuaxin();
                }
            },
        });

    });
})