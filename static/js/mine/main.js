//选择某一个菜品的按钮
$('.j-choose').click(function () {
    $(this).find("i").toggleClass("c-chosen");
});

//加号，减号
$('.j-minus').click(function () {
    if($(this).siblings('input').val()==1){
        return;
    }
    $(this).siblings('input').attr("value",$(this).siblings('input').attr("value")-1);
});
$('.j-plus').click(function () {
    if($(this).siblings('input').val()==9){
        return;
    }
    $(this).siblings('input').attr("value",$(this).siblings('input').attr("value")*1+1);
});

//点击已点的菜品,点击返回
$('.j-mine-btn,.j-back-btn').click(function(){
    $('.j-mine').toggle();
    $('.j-submit').toggle();
    $('.j-lists').toggle();
    $('.j-orders').toggle();
    $('.j-lists-header').toggle();
    $('.j-orders-header').toggle();
    if($(this).hasClass("j-mine-btn")){
        $(".j-orders").empty();
        $(".j-orders").append($('.c-chosen').parents('.j-item').clone(true));
        //这里显示和添加数量
        $('.j-orders .j-item').find('.j-num').toggleClass("hide");
        $('.j-orders .j-item').find('.j-des').toggleClass("hide");
        $('.j-orders .j-choose').click(function(){
            var id =  $(this).parents('.j-item').attr("data-id");
            $(this).parents('.j-item').remove();
            $("[data-id='"+id+"']").find(".j-choose").click();
        });
    }
});

//提交
$(".j-submit").click(function(){
    var order = $('.j-orders .j-item').
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