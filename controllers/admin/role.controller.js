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
module.exports.permission = async (req,res) => {
    let find = {
        deleted: false
    }

    const record = await Role.find(find)
    
    res.render("admin/pages/role/permission", {
        pageTitle: " Phân quyền",
        records: record
    })
}

// [PATCH] /admin/role/permission
module.exports.permissionChange = async (req,res) => {
    let newPermissions = JSON.parse(req.body.permissions)
    
    for(const item of newPermissions){
        await Role.updateOne({_id: item.id}, {permissions: item.permissions})
    }

    req.flash("success", "Cập nhật phân quyền thành công")
    res.redirect("back")
}