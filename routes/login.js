module.exports = function(req,res){

	res.render("login",{
        redir: req.query.redir || "/",
		title:"登录餐厅管理后台"
	});
}