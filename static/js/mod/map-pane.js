(function(){
    var map;
    var mapInited;
    function initMap() {
        if (mapInited) {
            return;
        }
        function initialize() {
            map = new BMap.Map("map-container");
            map.addControl(new BMap.NavigationControl());
            mapInited = true;
            refreshMap();
        }

        window.initializeMap = initialize;
        function loadScript() {
            var script = document.createElement("script");
            script.src = "http://api.map.baidu.com/api?v=1.4&callback=initializeMap";
            document.body.appendChild(script);
        }

        loadScript();
    };


// 地图隐藏显示
    var mapOpened = false;
    $("#button-toggle-map").click(function () {
        if(!shops.length){
            toastr.error("没有商户");
            return;
        }
        $(this).html(mapOpened ? "显示地图" : "隐藏地图");
        var $container = $("#map-container");
        if (mapOpened) {
            $container.hide();
        } else {
            $container.show();
            !mapInited && initMap();
        }
        mapOpened = !mapOpened;
    });


    function refreshMap() {
        var points = [];
        shops.filter(function (shop) {
            return shop.GLng && shop.GLat;
        }).forEach(function (shop, i) {
            var point = new BMap.Point(+shop.GLng, +shop.GLat);
            var marker = new BMap.Marker(point);

            points.push(point);
            marker.addEventListener("click", function () {
                var opts = {
                    width: 250,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title: shop.ShopId + shop.ShopName + shop.BranchName  // 信息窗口标题
                };

                $("#info").html(shop.ShopName + " " + shop.BranchName + " " + "<a target='_blank' href='http://www.dianping.com/shop/" + shop.ShopId + "'>查看</a>");
                map.openInfoWindow(infoWindow, map.getCenter());
                var infoWindow = new BMap.InfoWindow(shop.ShopName, opts);  // 创建信息窗口对象
            });
            map.addOverlay(marker);
        });

        map.centerAndZoom(points[0], 15);
        map.setViewport(points);
    }
})();