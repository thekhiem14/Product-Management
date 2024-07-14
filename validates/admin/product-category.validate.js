// Được file route gọi
module.exports.creatPost = (req,res, next) => {
    if(!req.body.title) {
         req.flash("error",`Vui long nhap tieu de`)
         res.redirect("back")
         return
    }

    next()
}