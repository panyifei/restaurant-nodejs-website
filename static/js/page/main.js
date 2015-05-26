//选择某一个菜品的按钮
$('.j-choose i').click(function () {
    if($(this).hasClass('c-chosen')){
        $(this).removeClass('c-chosen');
    }else{
        //如果点击了积分的话，会进行限制的，根据等级判断能够兑换几份
        if($(this).hasClass('j-use-credit')){
            var num = $('.j-user-info').data('level');
            if($('.j-show-lists .j-use-credit.c-chosen').length >= num){
                $('.j-tip h2').text("您的等级为"+num+"级，一次消费只能兑换一份");
                $('.j-tip').removeClass('hide');
                return;
            }
        }

        if($(this).siblings().hasClass('c-chosen')){
            $(this).addClass('c-chosen').siblings().removeClass('c-chosen');
        }else{
            $(this).addClass('c-chosen');
        }
    }
});

//选择某个种类
$('.c-kinds span').click(function(){
    //改变选中的样式
    if($(this).hasClass('c-chosen-kind')) return;
    $(this).addClass("c-chosen-kind").siblings('span').removeClass('c-chosen-kind');
    var kind = $(this).attr("data-kind");
    if(kind == 0){
        //这个时候选中的是特色
        $(".j-item[data-ifrecommend='"+1+"']").removeClass('hide');
        $(".j-item[data-ifrecommend!='"+1+"']").addClass('hide');
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

//点击购物车
$('.j-chosen-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-chosen').removeClass('hide').siblings().addClass('hide');
    $('.j-chosen-header').removeClass('hide').siblings().addClass('hide');

    $(".j-chosen").empty();
    $(".j-chosen").append($('.c-chosen').parents('.j-item').clone(true));
    //这里显示和添加数量
    $('.j-chosen .j-item').removeClass('hide');
    $('.j-chosen .j-item').find('.c-chosen').siblings().remove();
    var allitems = $('.j-chosen .j-item').find('.c-chosen');
    //如果数量为0
    if(allitems.length==0){
        $('.j-chosen').addClass('hide').siblings('.j-submit').addClass('hide').siblings('.j-no-chosen').removeClass('hide');
    }else{
        $('.j-chosen').removeClass('hide').siblings('.j-submit').removeClass('hide').siblings('.j-no-chosen').addClass('hide');
    }
    for(var i = 0;i < allitems.length;i++){
        if($(allitems.get(i)).hasClass('j-use-credit')===false){
            $(allitems.get(i)).parents('.j-item').find('.j-num').toggleClass("hide");
        }
    }

    $('.j-chosen .j-choose').click(function(){
        var id =  $(this).parents('.j-item').attr("data-id");
        $(this).parents('.j-item').remove();
        $("[data-id='"+id+"']").find(".j-choose").click();
    });

});

//点击主页
$('.j-main-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-lists').removeClass('hide').siblings().addClass('hide');
    $('.j-lists-header').removeClass('hide').siblings().addClass('hide');
});

//点击订单
$('.j-orders-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-orders').removeClass('hide').siblings().addClass('hide');
    $('.j-orders-header').removeClass('hide').siblings().addClass('hide');
    var telephone = $('.j-user-info').data('telephone');
    $.ajax({
        type: "post",
        url: "ajax/getOrders",
        data: {
            telephone: telephone
        },
        success: function (res) {
            if(res.length==0){
                $('.j-orders').empty();
                $('.j-no-orders').removeClass('hide');
            }else{
                $('.j-no-orders').addClass('hide');
                $('.j-orders').empty();
                var orders = "";
                for(var l=0;l<res.length;l++){
                    orders+="<div class='c-order j-order' data-id='"+res[l].id+"'><div class='c-time'>"+res[l].addTime.substring(0,10)+" 下单</div>";
                    var orderarr = res[l].definition.split('/');
                    for(var i = 0;i<orderarr.length;i++){
                        var order = orderarr[i].split("@");
                        if(order.length == 1){
                            order = orderarr[i].split('#');
                        }
                        orders+="<div class='c-menu'><span class='c-menu-name'>"+order[1]+"</span><span>x</span><span class='c-menu-num'>"+order[2]+"</span></div>";
                    }
                    orders+="<div class='c-price-div'><span>共消费:</span><span class='c-total'>￥"+res[l].total+"</span><span> 使用积分:</span><span class='c-total'>"+res[l].creditused+"两</span></div>";
                    orders+="<div class='c-status-div'><span>订单状态:</span><span class='";
                    if(res[l].status == '已撤单'){
                        orders+="c-status-cancel";
                    }else{
                        orders+="c-status";
                    }

                    orders+="'>"+res[l].status+"</span></div>";
                    if(res[l].status=="已提交"){
                        orders+="<div class='c-change-status'><span class='j-change-status'>撤单</span></div>";
                    }
                    orders+="</div>";
                    orders+="<div class='c-division'></div>";
                }
                orders+="<div class='c-big-division'></div>";
                $('.j-orders').append(orders);
                //这里给撤单加个点击事件
                $(".j-change-status").click(function(){
                    var id = $(this).parents('.j-order').data('id');
                    $.ajax({
                        type: "post",
                        url: "ajax/changeOrder",
                        data: {
                            id:id
                        },
                        success: function (res) {
                            $('.j-tip h2').text(res);
                            $('.j-tip').removeClass('hide');
                            $('.j-orders-foot').click();
                        },
                        error: function () {
                            //toastr.error('发生错误');
                        }
                    });
                });
            }
        },
        error: function () {
            //toastr.error('发生错误');
        }
    });
});

//点击我的
$('.j-mine-foot').click(function(){
    $(this).addClass('c-foot-chosen').siblings().removeClass('c-foot-chosen');
    $('.j-show-mine').removeClass('hide').siblings().addClass('hide');
    $('.j-mine-header').removeClass('hide').siblings().addClass('hide');
});


//控制提示以及活动的显示消失
$('.j-tip').click(function(){
    $(this).addClass('hide');
});
$('.j-activity span').click(function(){
    $(this).parents('.j-activity').addClass('hide');
});
$('.j-activity-btn').click(function(){
    $('.j-activity').removeClass('hide');
});


//提交
$(".j-submit-btn").click(function(){
    var length = $('.j-chosen .j-item').length;
    var i = 0;
    var menus = "";
    var total = 0;
    var creditused = 0;
    var num;
    var telephone = $('.j-user-info').data('telephone');
    while(i<length){
        num = $($('.j-chosen .j-item')[i]).find("input").attr("value");
        menus += $($('.j-chosen .j-item')[i]).data("id");
        if($($('.j-chosen .j-item')[i]).find('.j-use-credit').length == 0){
            menus += "@";
            var price = $($('.j-chosen .j-item')[i]).data('price');
            total =  total * 1 + num * price;
            var name = $($('.j-chosen .j-item')[i]).data('name');
            menus += name + "@";

        }else{
            menus += "#";
            var credit = $($('.j-chosen .j-item')[i]).data('credit');
            creditused =  creditused * 1 + 1 * credit;
            var name = $($('.j-chosen .j-item')[i]).data('name');
            menus += name + "#";
        }
        menus += num;

        if(i != length-1){
            menus += "/";
        }
        i++;
    }
    //menus是具体的点餐的东西，形式是1@后面是数量@1/2@前面是id@1,@代表花钱
    var creditnow = $('.j-user-info').data('creditnow');;
    if(creditnow < creditused){
        $('.j-tip h2').text("您的积分只有" + creditnow + "两，不够"+creditused+"两啊~亲");
        $('.j-tip').removeClass('hide');
        return;
    }
    $.ajax({
        type: "post",
        url: "ajax/addOrder",
        data: {
            telephone: telephone,
            menus:menus,
            total:total,
            creditused:creditused
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