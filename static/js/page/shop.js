// 按状态筛选
$(".status-filter .btn").click(function () {
    $(this).toggleClass("btn-white");
    location.search = "?status=" + $(this).attr("data-index");
});

// 新增签约商户
$("#button-add").click(function () {
    $(".ipt-shopid").val("");
    $('#modal-add-shop').modal('show');
});


// 添加商户
$("#modal-add-shop .btn").click(function () {
    var shopId = $("#modal-add-shop .ipt-shopid").val().trim();
    var contactName = $("#modal-add-shop .ipt-contact-name").val().trim();
    var contactPhoneNo = $("#modal-add-shop .ipt-contact-phoneno").val().trim();
    var comment = $("#modal-add-shop .ipt-comment").val().trim();
    var actionTime = $("#modal-add-shop .ipt-date").val().trim();
    var saler = $("#modal-add-shop .ipt-saler").val().trim();
    var phoneCount = $("#modal-add-shop .ipt-phone-count").val().trim();
    var areaRange = $("#modal-add-shop .ipt-area-range").val();
    var cashierDesk = $("#modal-add-shop .ipt-cashier-desk").val();
    var wifiStatus = $("#modal-add-shop .ipt-wifi-status").val();
    var phoneLineDetail = $("#modal-add-shop .ipt-phone-line-detail").val();

    $.ajax({
        type: "put",
        url: "/ajax/shop",
        data: {
            shopId: shopId,
            contactName: contactName,
            contactPhoneNo: contactPhoneNo,
            phoneCount: phoneCount,
            comment: comment,
            areaRange: areaRange,
            cashierDesk: cashierDesk,
            wifiStatus: wifiStatus,
            phoneLineDetail: phoneLineDetail,
            actionTime: actionTime,
            saler: saler
        },
        success: function () {
            toastr.success('添加成功');
            location.reload();
        },
        error: function (xhr) {
            toastr.error(xhr.responseText);
        }
    });
});

if (canEditShop) {
    $(".editable").get().forEach(function (elem) {
        var $tr = $(elem).closest("tr");
        var fieldName = $(elem).attr("data-field");
        var id = $tr.attr("data-id");

        new EditableCell(elem, function (newText) {
            var data = {};
            data[fieldName] = newText;
            $.ajax({
                type: "post",
                url: "/ajax/shop/" + id + "/detail",
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

    $("td .select-control").change(function(){
        var val = $(this).val();
        var $tr = $(this).closest("tr");
        var fieldName = $(this).parent().attr("data-field");
        var id = $tr.attr("data-id");

        var data = {};
        data[fieldName] = val;
        $.ajax({
            type: "post",
            url: "/ajax/shop/" + id + "/detail",
            data: data,
            success: function () {
                toastr.success("更新成功");
            },
            error: function (xhr) {
                toastr.error(xhr.responseText);
            }
        });
    });
}

//根据区域选择
$('.j-district').change(function(){
    if($(this).val()=='默认'){
        $('[data-district]').show();
    }else{
        $('[data-district="'+$(this).val()+'"]').show().siblings('[data-district!="'+$(this).val()+'"]').hide();
    }
    var num = $('[data-district]:visible').length;
    $('.j-dis').text('共'+num+'家');
});