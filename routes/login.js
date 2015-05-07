module.exports = function(req,res){

	res.render("login",{
        redir: req.query.redir || "/",
		title:"登录加里森设备管理后台"
	});
}