//点击入库
$('.j-add').click(function(){
    var type = $('input[name="type"]:checked').val();
    var num = $('input[name="num"]').val();
    var deviceId = $('input[name="deviceId"]').val();
    var note = $('input[name="note"]').val();
    var phoneNum = $('input[name="phoneNum"]').val();

    $.ajax({
        type: "put",
        url: "/ajax/stock",
        data: {
            Type: type,
            Num: num,
            DeviceId: deviceId,
            InNote: note,
            PhoneNum:phoneNum
        },
        success: function () {
            toastr.success('添加成功');
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

    if(type == 'SIM卡'){
        $('.j-help').text('请填写唯一的设备ID');
    }else{
        $('.j-help').text('可以以分号隔开，多个添加');
    }
});


