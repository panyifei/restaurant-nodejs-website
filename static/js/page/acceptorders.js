//获取订单
$.ajax({
    type: "post",
    url: "ajax/getAllOrders",
    data: {
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
