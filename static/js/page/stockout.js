//点击出库
$('.j-out').click(function(){
    var type = $('input[name="type"]:checked').val();
    var num = $('input[name="num"]').val();
    var deviceId = $('input[name="deviceId"]').val();
    var note = $('input[name="note"]').val();
    var refUser = $('input[name="refUser"]').val();

    $.ajax({
        type: "post",
        url: "/ajax/stockout",
        data: {
            Type: type,
            Num: num,
            DeviceId: deviceId,
            OutWay: note,
            RefUser:refUser
        },
        success: function (xhr) {
            toastr.success(xhr);
        },
        error: function (xhr) {
            toastr.error(xhr.responseText);
        }
    });
});

//选择了蓝牙电话或者POS机
$('input[name="type"]').change(function(){
    var type = $('input[name="type"]:checked').val();
    if(type == 'POS机' ||type == '蓝牙电话'||type == 'SIM卡'){
        $('.j-deviceid-div').show().next().show();
        $('.j-num-div').hide().next().hide();
    }else{
        $('.j-deviceid-div').hide().next().hide();
        $('.j-num-div').show().next().show();
    }
});


