module.exports = function(req,res){
    var type = req.query.type || 0;
    res.render("orders", {
        type:type,
        title: req.meta.order_type[type].key,
        currentUser:req.user
    });
}