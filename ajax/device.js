//var async = require("async");
//var _s = require("underscore.string");

exports.bindShop = function(req,res,next){
    //var deviceId = req.params.deviceId;
    //var shopId = req.body.shopId;
    //var Device = req.services.Device;
    //var Shop = req.services.Shop;
    //var AdminAction = req.services.AdminAction;
    //
    //if(!shopId){
    //    return res.send(400, "请填写商户号");
    //}
    //
    //Device.find({
    //    DeviceId: deviceId
    //}, function(err, devices){
    //    if(err){
    //        return next(err);
    //    }
    //    var device = devices[0];
    //    if(!device){
    //        return res.send(400, "设备号不存在，请先添加设备");
    //    }
    //
    //    Shop.get(shopId, function(err, shop){
    //        if(err){
    //            return next(err);
    //        }
    //        if(!shop){
    //            return res.send(400, "商户不存在或未签约");
    //        }
    //
    //        Device.update(device.DeviceId, {
    //            Status: req.meta.status.CONFIGED.value,
    //            isActive: 1,
    //            ShopId: shopId
    //        }, function(err){
    //            if(err){
    //                return next(err);
    //            }
    //
    //            AdminAction.log(req, deviceId, shopId, AdminAction.actions.BIND_SHOP, null, "绑定商户" + shop.shopName);
    //            res.send(200,"ok");
    //        });
    //    });
    //});
};
