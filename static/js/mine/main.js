//选择某一个菜品的按钮
$('.c-choose').click(function () {
    $(this).find("i").toggleClass("c-chosen");
    $(this).parent(".j-item").find('.j-num').toggleClass("hide");
    $(this).parent(".j-item").find('.j-des').toggleClass("hide")
});

//加号，减号
$('.j-minus').click(function () {
    if($(this).siblings('input').val()==1){
        return;
    }
    $(this).siblings('input').val($(this).siblings('input').val()-1);
});
$('.j-plus').click(function () {
    if($(this).siblings('input').val()==9){
        return;
    }
    $(this).siblings('input').val($(this).siblings('input').val()*1+1);
});

//提交
$(".j-submit").click(function(){
    $.ajax({
        type: "post",
        url: "addOrder",
        data: {
            telephone: '13121310'
        },
        success: function () {
            //toastr.success('统计状态修改成功');
        },
        error: function () {
            //toastr.error('发生错误');
        }
    });
});