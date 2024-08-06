const SettingGeneral = require("../../models/settings-genetal.model")

module.exports.logo = async (req,res, next) => {
  const general = await SettingGeneral.findOne()
  res.locals.general = general

  next()
}