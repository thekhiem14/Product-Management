// Được file route gọi
module.exports.creatPost = (req,res, next) => {
  if(!req.body.fullName) {
    req.flash("error",`Vui long nhap ho ten`)
    res.redirect("back")
    return
  }

  if(!req.body.email) {
    req.flash("error",`Vui long nhap email`)
    res.redirect("back")
    return
  }

  if(!req.body.password) {
    req.flash("error",`Vui long nhap mat khau`)
    res.redirect("back")
    return
  }

  next()
}