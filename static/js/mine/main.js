//选择某一个菜品的按钮
$('.j-choose').click(function () {
    $(this).find("i").toggleClass("c-chosen");
});

//选择某个种类
$('.c-kinds span').click(function(){
    //改变选中的样式
    if($(this).hasClass('c-chosen-kind')) return;
    $(this).addClass("c-chosen-kind").siblings('span').removeClass('c-chosen-kind');
    var kind = $(this).attr("data-kind");
    if(kind == 0){
        $(".j-item").removeClass('hide');
        return;
    }
    $(".j-item[data-kind!='"+kind+"']").addClass('hide');
    $(".j-item[data-kind='"+kind+"']").removeClass('hide');
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

//点击已选
$('.j-chosen-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-chosen').removeClass('hide').siblings().addClass('hide');
    $('.j-chosen-header').removeClass('hide').siblings().addClass('hide');
    if($(this).hasClass("j-mine-btn")){
        $(".j-orders").empty();
        $(".j-orders").append($('.c-chosen').parents('.j-item').clone(true));
        //这里显示和添加数量
        $('.j-orders .j-item').removeClass('hide');
        $('.j-orders .j-item').find('.j-num').toggleClass("hide");
        $('.j-orders .j-item').find('.j-des').toggleClass("hide");
        $('.j-orders .j-choose').click(function(){
            var id =  $(this).parents('.j-item').attr("data-id");
            $(this).parents('.j-item').remove();
            $("[data-id='"+id+"']").find(".j-choose").click();
        });
    }
});

//点击主页
$('.j-main-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-lists').removeClass('hide').siblings().addClass('hide');
    $('.j-lists-header').removeClass('hide').siblings().addClass('hide');
});

//点击我的
$('.j-mine-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-mine').removeClass('hide').siblings().addClass('hide');
    $('.j-lists-header').removeClass('hide').siblings().addClass('hide');
});


//控制提示的显示消失
$('.j-tip').click(function(){
    $(this).addClass('hide');
});

//提交
$(".j-submit-btn").click(function(){
    var length = $('.j-orders .j-item').length;
    var i = 0;
    var menus = "";
    var total = 0;
    while(i<length){
        menus += $($('.j-orders .j-item')[i]).data("id")+"@";
        var num = $($('.j-orders .j-item')[i]).find("input").attr("value");
        menus += num;
        var price = $($('.j-orders .j-item')[i]).find(".j-price").text();
        total =  total * 1 + num * price;
        if(i != length-1){
            menus += "/";
        }
        i++;
    }
    //menus是具体的点餐的东西，形式是1@1/2@1

    $.ajax({
        type: "post",
        url: "ajax/addOrder",
        data: {
            telephone: '13121310',
            menus:menus,
            total:total
        },
        success: function (res) {
            $('.j-tip h2').text(res);
            $('.j-tip').removeClass('hide');
        },
        error: function () {
            //toastr.error('发生错误');
        }
    });
});