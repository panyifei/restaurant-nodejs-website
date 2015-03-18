//点击搜索
$('.j-search').click(function(){
    location.search = "?search=" + $(".ipt-search").val()
});
