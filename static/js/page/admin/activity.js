$(".editable").get().forEach(function (elem) {
    var $tr = $(elem).closest("tr");
    var fieldName = $(elem).attr("data-field");
    var id = $tr.attr("data-id");

    new EditableCell(elem, function (newText) {
        var data = {};
        data[fieldName] = newText;
        $.ajax({
            type: "post",
            url: "/ajax/activity/" + id + "/detail",
            data: data,
            success: function () {
                toastr.success("更新成功");
            },
            error: function (xhr) {
                toastr.error(xhr.responseText);
            }
        });
    });
});

//删除按钮的初始化
$('.j-remove').click(function(){
    var id = $(this).parents('tr').data('id');
    $(this).addClass('j-re');
    $.ajax({
        type: "delete",
        url: "/ajax/activity/" + id + "/delete",
        success: function () {
            toastr.success("删除成功");
            $('.j-re').parents('tr').remove();
        },
        error: function (xhr) {
            $('.j-re').removeClass('j-re');
            toastr.error(xhr.responseText);
        }
    });
});


//添加按钮
$('.j-add').click(function(){
    var subject = $('input[name=subject]').val();
    var detail = $('input[name=detail]').val();

    $.ajax({
        type: "put",
        url: "/ajax/activity/add",
        data:{
            subject:subject,
            detail:detail
        },
        success: function () {
            toastr.success("添加成功，请刷新页面查看");
        },
        error: function (xhr) {
            toastr.error(xhr.responseText);
        }
    });
});