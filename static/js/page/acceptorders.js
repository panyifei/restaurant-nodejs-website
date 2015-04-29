//初始化nav的点击
$('.j-nav span').click(function(){
    $(this).addClass('c-chosen').siblings().removeClass('c-chosen');
    var status = $(this).text();
    $("[data-status='"+status+"']").removeClass('hide');
    $(".j-order[data-status!='"+status+"']").addClass('hide');
});
//获取订单
$.ajax({
    type: "post",
    url: "ajax/getAllOrders",
    data: {
    },
    success: function (res) {
        $('.j-orders').empty();
        var orders = "";
        for(var l=0;l<res.length;l++){
            orders+="<div class='c-order j-order' data-id='"+res[l].id+"' data-status='"+res[l].status+"'><div class='c-time'>"+res[l].addTime.substring(0,10)+" 下单</div>";
            var orderarr = res[l].definition.split('/');
            for(var i = 0;i<orderarr.length;i++){
                var order = orderarr[i].split("@");
                if(order.length == 1){
                    order = orderarr[i].split('#');
                }
                orders+="<div class='c-menu'><span class='c-menu-name'>"+order[1]+"</span><span>x</span><span class='c-menu-num'>"+order[2]+"</span></div>";
            }
            orders+="<div class='c-message'><span>订单号码:</span>"+res[l].telephone+"</div>";
            orders+="<div class='c-message'><span>共消费:</span><span class='c-total'>￥"+res[l].total+"</span><span> 使用积分:</span><span class='c-total'>"+res[l].creditused+"两</span></div>";
            orders+="<div class='c-message'><span>订单状态:</span><span class='";
            if(res[l].status == '已撤单'){
                orders+="c-status-cancel";
            }else{
                orders+="c-status";
            }

            orders+="'>"+res[l].status+"</span></div>";
            if(res[l].status=="已提交"){
                orders+="<div class='c-accept-status'><span class='c-accept j-accept-status'>接受</span><span class='c-cancel j-cancel-status'>拒绝</span></div>";
            }

            orders+="</div>";
            orders+="<div class='c-division'></div>";
        }
        orders+="<div class='c-big-division'></div>";
        $('.j-orders').append(orders);
        //默认点击未处理
        $(".j-default-nav").click();
        //这里给接单加个点击事件
        $(".j-accept-status").click(function(){
            var id = $(this).parents('.j-order').data('id');
            $.ajax({
                type: "post",
                url: "ajax/acceptOrder",
                data: {
                    id:id
                },
                success: function (res) {
                    if(res == "成功"){
                        toastr.success("成功接受该订单");
                        setTimeout("location.reload()",2000);
                    }else{
                        toastr.success(res);
                        setTimeout("location.reload()",2000);
                    }

                },
                error: function () {
                    toastr.error('发生错误，请于技术人员联系');
                }
            });
        });
        //这里给撤单加个点击事件
        $(".j-cancel-status").click(function(){
            var id = $(this).parents('.j-order').data('id');
            $.ajax({
                type: "post",
                url: "ajax/cancelOrder",
                data: {
                    id:id
                },
                success: function (res) {
                    if(res == "成功"){
                        toastr.success("成功撤销该订单");
                        setTimeout("location.reload()",2000);
                    }else{
                        toastr.success(res);
                        setTimeout("location.reload()",2000);
                    }

                },
                error: function () {
                    toastr.error('发生错误，请于技术人员联系');
                }
            });
        });

    },
    error: function () {
        //toastr.error('发生错误');
    }
});

setTimeout("location.reload()",10000);