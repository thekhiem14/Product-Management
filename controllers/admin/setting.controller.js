const SettingGeneral = require("../../models/settings-genetal.model")

// [GET] /settings/general
module.exports.general = async (req, res) => {
  const general =await SettingGeneral.findOne()

  res.render("admin/pages/setting/general", {
    pageTitle: "Cài đặt chung",
    general: general
  })
}

// [PATCH] /settings/general
module.exports.generalPatch = async (req, res) => {
  const general = new SettingGeneral(req.body)
  await general.save()
  
  res.redirect("back")
}