const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")

// [GET] /admin/role
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find)

    res.render("admin/pages/role/index", {
        pageTitle: "Nhóm quyền",
        record: record
    })
}

// [GET] /admin/role/create
module.exports.create = async (req,res) => {
    res.render("admin/pages/role/create", {
        pageTitle: " Tạo Nhóm quyền",
    })
}

// [POST] /admin/role/create
module.exports.createPost = async (req,res) => {
    const record = new Role(req.body)
    await record.save()

    res.redirect(`${systemConfig.prefixAdmin}/role`)
}

// [GET] /admin/role/permission
// module.exports.permission = async (req,res) => {
//     let find = {
//         deleted: false
//     }

//     const record = Role.find(find)
// }