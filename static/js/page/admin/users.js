$(".editable").get().forEach(function (elem) {
    var $tr = $(elem).closest("tr");
    var fieldName = $(elem).attr("data-field");
    var id = $tr.attr("data-id");

    new EditableCell(elem, function (newText) {
        var data = {};
        data[fieldName] = newText;
        $.ajax({
            type: "post",
            url: "/ajax/users/" + id + "/detail",
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
        url: "/ajax/users/" + id + "/delete",
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