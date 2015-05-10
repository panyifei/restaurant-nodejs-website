//初始化上面的展开
$('#side-menu').metisMenu();
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
            orders+="<tr class='c-order j-order' data-id='"+res[l].id+"' data-status='"+res[l].status+"'>";
            orders+="<td>"+res[l].telephone+"</td>";
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
            orders+="</tr>";
        }
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

//setTimeout("location.reload()",10000);