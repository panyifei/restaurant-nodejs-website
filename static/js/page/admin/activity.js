$(".editable").get().forEach(function (elem) {
    var $tr = $(elem).closest("tr");
    var fieldName = $(elem).attr("data-field");
    var id = $tr.attr("data-id");

    new EditableCell(elem, function (newText) {
        var data = {};
        data[fieldName] = newText;
        $.ajax({
            type: "post",
            url: "/ajax/activity/" + id + "/detail",
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