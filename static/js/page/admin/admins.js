$(".editable").get().forEach(function (elem) {
    var $tr = $(elem).closest("tr");
    var fieldName = $(elem).attr("data-field");
    var id = $tr.attr("data-id");

    new EditableCell(elem, function (newText) {
        var data = {};
        data[fieldName] = newText;
        $.ajax({
            type: "post",
            url: "/ajax/admins/" + id + "/detail",
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
        url: "/ajax/admins/" + id + "/delete",
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
    var name = $('input[name=name]').val();
    var password = $('input[name=password]').val();
    var role = $('input[name=role]').val();
    $.ajax({
        type: "put",
        url: "/ajax/admins/add",
        data:{
            name:name,
            password:password,
            role:role
        },
        success: function () {
            toastr.success("添加成功，请刷新页面查看");

        },
        error: function (xhr) {
            toastr.error(xhr.responseText);
        }
    });
});