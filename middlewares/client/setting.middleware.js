const SettingGeneral = require("../../models/settings-genetal.model")

module.exports.logo = async (req,res, next) => {
  const general = await SettingGeneral.findOne()
  console.log(general)
  res.locals.general = general

  next()
}