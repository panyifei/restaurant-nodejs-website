// 搜索商户
function search() {
    location.search = "?search=" + $(".ipt-search").val()
}
$(".btn-search").click(search);
$(".ipt-search").keyup(function (e) {
    if (e.which == 13) {
        search();
    }
});