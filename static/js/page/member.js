$(".change-password").click(function(){
    var $tr = $(this).closest('tr');
    var id = $tr.attr("data-id");
    $("#modal-change-password").modal("show");
    $("#modal-change-password .ipt-id").val(id);
});

$("#modal-change-password .btn-primary").click(function(){
    var id = $("#modal-change-password .ipt-id").val();
    var password = $("#modal-change-password .ipt-password").val();
    if(!password){
        return toastr.error("请输入密码");
    }
    $.ajax({
        type:"post",
        url:"/ajax/member/" + id,
        data:{
            password: password
        },
        success: function(){
            toastr.success("修改成功");
            $("#modal-change-password").modal("hide");
        },
        error: function(){
            toastr.error("发生错误");
        }
    });
})

$(".add-user").click(function(){
  $("#modal-add-user").modal("show");
});

$("#modal-add-user .btn-primary").click(function(){
  var username = $("#modal-add-user .ipt-username").val();
  var password = $("#modal-add-user .ipt-password").val();
  var role = $("#modal-add-user .ipt-role").val();
  var email = $("#modal-add-user .ipt-email").val();

	$.ajax({
		type:"put",
		url:"/ajax/member",
		data:{
			email: email,
			role: role,
			username: username,
			password: password
		},
		success: function(){
			toastr.success("操作成功");
			location.reload();
		},
		error: function(xhr){
			toastr.error(xhr.responseText);
		}
	});
});

$(".remove-user").click(function(){
	var $tr = $(this).closest('tr');
	var id = $tr.attr('data-id');
	$.ajax({
		type:"delete",
		url:'/ajax/member/' + id,
		success: function(){
			toastr.success('操作成功');
			$tr.remove();
		},
		error: function(){
			toastr.error('发生错误');
		}
	});
});

$(".member-role").change(function(){
    var $select = $(this);
    var $tr = $(this).closest('tr');
    var id = $tr.attr("data-id");
    var role = $select.val();
    $.ajax({
        type:"post",
        url:"/ajax/member/" + id,
        data:{
            role:role
        },
        success: function(){
            $tr.attr("data-role",role);
            toastr.success('操作成功');
        },
        error: function(){
            $select.val($tr.attr("data-role"));
            toastr.error("发生错误");
        }
    });
});