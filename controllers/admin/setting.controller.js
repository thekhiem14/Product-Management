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
  await SettingGeneral.findOneAndReplace(
    {}, // Điều kiện tìm kiếm (để trống nếu chỉ có một bản ghi)
    req.body,
    { new: true, upsert: true } // Trả về dữ liệu mới, tạo mới nếu không có
  );
  
  res.redirect("back")
}