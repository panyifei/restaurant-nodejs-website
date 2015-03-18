// 按状态筛选
$(".status-filter .btn").click(function () {
    $(this).toggleClass("btn-white");

    if($(this).hasClass("btn-white")){
        location.search = "";
    }else{
        location.search = "?status=" + $(this).attr("data-index")
    }
});

var status_changing_row;
// 切换状态
$(".select-status").change(function () {
    var deviceid = $(this).closest("tr").attr("data-deviceid");
    var status = $(this).val();
    var expressNo = $("#modal-change-status-info").find(".ipt-express-no");
    $("#modal-change-status-info").modal("show");
    if (status == 3) {
        expressNo.closest(".form-group").show();
    } else {
        expressNo.closest(".form-group").hide();
    }
    status_changing_row = $(this).closest("tr");
    $("#modal-change-status-info").find(".ipt-status").val(status);
    $("#modal-change-status-info").find(".ipt-device-id").val(deviceid);
    $("#modal-change-status-info").find(".ipt-comment").val("");
    $("#modal-change-status-info").find(".ipt-express").val("");
});

//切换是否统计
$('.select-statistics').change(function(){
    var deviceId = $(this).closest("tr").attr("data-deviceid");
    var statistics = $(this).val();
    $.ajax({
        type: "post",
        url: "/ajax/device/" + deviceId + "/detail",
        data: {
            ifStatistics: statistics
        },
        success: function () {
            toastr.success('统计状态修改成功');
        },
        error: function () {
            toastr.error('发生错误');
        }
    });
});

$("#modal-change-status-info").on("hidden.bs.modal", function () {
    status_changing_row && status_changing_row.find(".select-status").val(status_changing_row.attr("data-status"));
})

// 切换状态确认
$("#modal-change-status-info .btn-primary").click(function () {
    var deviceId = $("#modal-change-status-info").find(".ipt-device-id").val();
    var status = $("#modal-change-status-info").find(".ipt-status").val();
    var comment = $("#modal-change-status-info").find(".ipt-comment").val();
    var refUser = $("#modal-change-status-info").find(".ipt-ref-user").val();
    var expressNo = $("#modal-change-status-info").find(".ipt-express-no").val();
    var actionTime = $("#modal-change-status-info").find(".ipt-action-time").val();

    if (!deviceId) {
        return toastr.error("还未分配设备");
    }

    if (status == 3 && !expressNo) {
        return toastr.error("请填写快递单号");
    }

    $.ajax({
        type: "post",
        url: "/ajax/device/" + deviceId + "/status",
        data: {
            status: status,
            deviceId: deviceId,
            expressNo: expressNo,
            comment: comment, // action log
            refUser: refUser, // action log
            actionTime: actionTime
        },
        success: function () {
            toastr.success('修改成功');
            status_changing_row.attr("data-status", status);
            $("#modal-change-status-info").modal("hide");

        },
        error: function () {
            toastr.error('发生错误');
        }
    });
});

// 解绑设备
$(".resign-shop").click(function () {
    var shopId = $(this).closest("tr").attr("data-shopid");
    var deviceId = $(this).closest("tr").attr("data-deviceid");

    if (confirm("解绑设备会导致商家无法使用，请确认商家已经不再使用")) {
        $.ajax({
            type: "post",
            url: "/ajax/device/" + deviceId + "/unbind-shop",
            success: function () {
                toastr.success('重置成功');
                location.reload();
            }
        });
    }
});

// 分配设备
$(".assign-shop").click(function () {
    var deviceid = $(this).closest("tr").attr("data-deviceid");
    $("#modal-assign-shop .ipt-deviceid").val(deviceid);
    $('#modal-assign-shop').modal('show');
});

// 分配设备确认
$("#modal-assign-shop .btn").click(function () {
    var $modal = $("#modal-assign-shop");
    var shopid = $modal.find(".ipt-shopid").val();
    var deviceid = $modal.find(".ipt-deviceid").val().trim();
    if (!deviceid) {
        toastr.error("请填写设备号");
        return false;
    }

    $.ajax({
        type: "post",
        url: "/ajax/device/" + deviceid + "/bind-shop",
        data: {
            deviceId: deviceid,
            shopId: shopid
        },
        success: function (json) {
            toastr.success('修改成功');
            location.reload();
        },
        error: function (err) {
            toastr.error(err.responseText);
            //- location.reload();
        }
    });
    return false;
});

// 操作历史
$("#modal-action-history .nav-tabs li").click(function () {
    var index = $("#modal-action-history .nav-tabs li").index(this);
    $("#modal-action-history .nav-tabs li").removeClass("active");
    $(this).addClass("active");
    $("#modal-action-history .tab-pane").removeClass("active");
    $("#modal-action-history .tab-pane").eq(index).addClass("active");
});

$(".check-history").click(function () {
    var deviceId = $(this).closest("tr").attr("data-deviceid");
    var shopId = $(this).closest("tr").attr("data-shopid");

    function renderItem(action) {
        var html = '<div class="feed-element">'
            + '<div class="media-body ">'
            + '<strong>' + action.User + '</strong>' + action.Action + '<br>'
            + '<small class="text-muted">' + (action.Comment || '') + '</small><br>'
            + '<small class="text-muted">' + moment(action.AddTime).format("YYYY-MM-DD HH:mm") + '</small>'
            + '</div>'
            + '</div>';

        return $(html);
    }

    $("#modal-action-history").modal("show");

    var $shoplist = $("#modal-action-history").find(".feed-activity-list.shop-history");
    var $devicelist = $("#modal-action-history").find(".feed-activity-list.device-history");

    if (deviceId) {
        $devicelist.html("加载中...");
        $.ajax({
            type: "get",
            url: "/ajax/action/device/" + deviceId,
            success: function (list) {
                $devicelist.empty();
                list.forEach(function (item) {
                    var $item = renderItem(item);
                    $item.appendTo($devicelist);
                });
            },
            error: function () {
                $("#modal-action-history").modal("hide");
                toastr.error("加载失败");
            }
        });
    }

    if (shopId) {
        $shoplist.html("加载中...");
        $.ajax({
            type: "get",
            url: "/ajax/action/shop/" + shopId,
            success: function (list) {
                $shoplist.empty();
                list.forEach(function (item) {
                    var $item = renderItem(item);
                    $item.appendTo($shoplist);
                });
            },
            error: function () {
                $("#modal-action-history").modal("hide");
                toastr.error("加载失败");
            }
        });
    }
});

$(".check-express").click(function(){
    var expressNo = $(this).closest("tr").attr("data-expressno");
    if(!expressNo){
        return toastr.error("单号不存在");
    }
    $.ajax({
        type:"get",
        url:"/ajax/express/" + expressNo,
        success: function(data){
            var resultText = "";
            resultText += data.isChecked ? "已签单" : "未签单";
            resultText += "<br />";
            resultText += data.result[0].text;
            toastr.success(resultText);
        },
        error: function(xhr){
            toastr.error(xhr.responseText);
        }
    })
});


$("#button-bind").click(function(){
    $("#modal-add-device").modal("show");
    $("#modal-add-device").find(".ipt-shopid").val("");
});

$("#modal-add-device .btn-primary").click(function () {

    var $modal = $("#modal-add-device");
    var deviceId = $modal.find(".ipt-deviceid").val().trim();

    if(!deviceId){
        toastr.error("请填写设备号");
    }

    $.ajax({
        type:"put",
        url:"/ajax/device",
        data:{
            deviceId: deviceId
        },
        success: function(){
            toastr.success("添加成功");
            location.reload();
        },
        error: function(xhr){
            toastr.error(xhr.responseText);
        }
    });
});

if (canUpdateDeviceDetail) {
    $(".editable").get().forEach(function (elem) {
        var $tr = $(elem).closest("tr");
        var fieldName = $(elem).attr("data-field");
        var id = $tr.attr("data-deviceid");

        new EditableCell(elem, function (newText) {
            var data = {};
            data[fieldName] = newText;
            $.ajax({
                type: "post",
                url: "/ajax/device/" + id + "/detail",
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
}