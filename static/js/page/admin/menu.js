$(".editable").get().forEach(function (elem) {
    var $tr = $(elem).closest("tr");
    var fieldName = $(elem).attr("data-field");
    var id = $tr.attr("data-id");

    new EditableCell(elem, function (newText) {
        var data = {};
        data[fieldName] = newText;
        $.ajax({
            type: "post",
            url: "/ajax/menu/" + id + "/detail",
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
        url: "/ajax/menu/" + id + "/delete",
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
    var description = $('input[name=description]').val();
    var kind = $('input[name=kind]').val();
    var price = $('input[name=price]').val();
    var creditprice = $('input[name=creditprice]').val();
    var ifrecommend = $('input[name=ifrecommend]').val();
    var picture = $('input[name=picture]').val();

    $.ajax({
        type: "put",
        url: "/ajax/menu/add",
        data:{
            name:name,
            description:description,
            kind:kind,
            price:price,
            creditprice:creditprice,
            ifrecommend:ifrecommend,
            picture:picture
        },
        success: function () {
            toastr.success("添加成功，请刷新页面查看");

        },
        error: function (xhr) {
            toastr.error(xhr.responseText);
        }
    });
});