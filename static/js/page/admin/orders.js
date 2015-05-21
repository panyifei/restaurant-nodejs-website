//初始化上面的展开
$('#side-menu').metisMenu();
//获取订单
$.ajax({
    type: "post",
    url: "ajax/getOrdersByType",
    data: {
        type:type
    },
    success: function (res) {
        $('.j-orders').empty();
        var orders = "";
        for(var l=0;l<res.length;l++){
            orders+="<tr class='c-order j-order' data-id='"+res[l].id+"' data-telephone='"+res[l].telephone+"' data-status='"+res[l].status+"'>";
            orders+="<td>"+res[l].id+"</td>";
            orders+="<td class='j-telephone'>"+res[l].telephone+"</td>";
            orders+="<td>"+moment(res[l].addTime).format('YYYY-MM-DD')+"</td>";
            var orderarr = res[l].definition.split('/');
            orders+="<td>";
            for(var i = 0;i<orderarr.length;i++){
                var order = orderarr[i].split("@");
                if(order.length == 1){
                    order = orderarr[i].split('#');
                }
                orders+="<span>"+order[1]+"</span><span>x</span><span>"+order[2]+"</span><br/>";
            }
            orders+="</td>";
            orders+="<td>￥"+res[l].total+"</td>";
            orders+="<td>"+res[l].creditused+"</td>";
            orders+="<td>"+res[l].status+"</td>";
            if(res[l].status=="已提交"){
                orders+="<td class='c-accept-status'><button class='btn btn-primary j-accept-status'>接受</button> <button class='btn btn-default j-cancel-status'>拒绝</button></td>";
            }else if(res[l].status=="已接受"){
                orders+="<td class='c-accept-status'><button class='btn btn-primary j-pay-status'>付款</button>";
            }else{
                orders+="<td></td>>"
            }
            orders+="</tr>";
        }
        $('.j-orders').append(orders);
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
        //这里给付款加个点击事件
        $(".j-pay-status").click(function(){
            var id = $(this).parents('.j-order').data('id');
            var telephone = $(this).parents('.j-order').data('telephone');
            $.ajax({
                type: "post",
                url: "ajax/payOrder",
                data: {
                    id:id,
                    telephone:telephone
                },
                success: function (res) {
                    if(res == "成功"){
                        toastr.success("该订单成功被支付");
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
