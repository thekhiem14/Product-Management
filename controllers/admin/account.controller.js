const md5 = require('md5')

const Account = require("../../models/account.model")
const Role = require("../../models/role.model")

const systemConfig = require("../../config/system")

// [GET] /admin/account
module.exports.index = async (req,res) => {
  let find = {
    deleted: false,
  }

  const records = await Account.find(find).select("-password -token")

  for (const record of records){
    const role = await Role.findOne({
      deleted: false,
      _id: record.role_id
    })
    record.role = role
  }

  res.render("admin/pages/account/index", {
       pageTitle: "Danh sách tài khoản",
       records: records
  })
}

// [GET] /admin/account/create
module.exports.create = async (req,res) => {
  let find = {
    deleted: false,
  }

  const roles = await Role.find(find)

  res.render("admin/pages/account/create", {
       pageTitle: "Tạo tài khoản",
       roles: roles
  })
}

// [POST] /admin/account/create
module.exports.createPost = async (req,res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false
  })

  if(emailExist){
    req.flash("error", "Email đã tồn tại")
    res.redirect("back")
  }
  else{
    req.body.password = md5(req.body.password)
  
    const record = new Account(req.body)
    await record.save()
  
    res.redirect(`${systemConfig.prefixAdmin}/account`)
  }
}