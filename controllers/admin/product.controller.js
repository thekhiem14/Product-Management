const Product = require("../../models/product.model")

const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helper/filterStatus")
const searchHelper = require("../../helper/search")
const pagiantionHelper = require("../../helper/pagination")

// [GET] /admin/product
module.exports.product = async (req, res) => {

     const filterStatus = filterStatusHelper(req.query)

     let find = {
          deleted: false
     }

     if (req.query.status) {
          find.status = req.query.status
     }

     const objectSearch = searchHelper(req.query)

     if (objectSearch.regex) {
          find.title = objectSearch.regex
     }

     // Pagination
     const countProduct = await Product.countDocuments(find)

     let objectPagination = pagiantionHelper(
          {
               limitItems: 4,
               currentPage: 1
          },
          req.query,
          countProduct
     )
     // End Pagination

     // Sort
     let sort ={};

     if(req.query.sortKey && req.query.sortValue) {
          sort[req.query.sortKey] = req.query.sortValue;
     }
     else {
          sort.position = "asc"
     }
     //End  Sort

     const product = await Product.find(find)
          .sort(sort)
          .limit(objectPagination.limitItems)
          .skip(objectPagination.skip)

     res.render("admin/pages/product/index", {
          product: product,
          filterStatus: filterStatus,
          keyword: objectSearch.keyword,
          pagination: objectPagination,
     })
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
     const status = req.params.status
     const id = req.params.id
     await Product.updateOne({ _id: id }, { status: status })

     req.flash("success", "Cap nhat trang thai thanh cong")
     // Cập nhật dữ liệu trong database
     res.redirect("back")
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
     const type = req.body.type
     const ids = req.body.ids.split(", ")

     switch (type) {
          case "active":
               await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
               req.flash("success", `Cap nhat trang thai thanh cong ${ids.length} san pham`)
               break;
          case "inactive":
               await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
               req.flash("success", `Cap nhat trang thai thanh cong ${ids.length} san pham`)
               break;
          case "delete-all":
               await Product.updateMany({ _id: { $in: ids } }, { deleted: "true" })
               req.flash("success", `Xoa thanh cong ${ids.length} san pham`)
               break;
          case "change-position":
               for (const item of ids) {
                    let [id, position] = item.split("-")
                    position = parseInt(position)

                    await Product.updateOne({ _id: id }, { position: position })
               }

               req.flash("success", `Doi vi tri thanh cong ${ids.length} san pham`)
               break;
          default:
               break;
     }

     res.redirect("back")
}

// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
     const id = req.params.id

     // await Product.deleteOne({ _id: id})
     // Xóa vĩnh viễn dữ liệu trong database

     await Product.updateOne({ _id: id }, {
          deleted: true,
          deletedAt: new Date()
          // Cập nhật ngày xóa
     })
     req.flash("success", `Xoa thanh cong san pham`)
     // Xóa mềm  

     res.redirect("back")
}

// [GET] /admin/product/creat
module.exports.creat = async (req, res) => {
     res.render("admin/pages/product/create", {
          pageTitle: "Them moi san pham"
     })
}
// [POST] /admin/product/creat
module.exports.creatPost = async (req, res) => {
     req.body.price = parseInt(req.body.price)
     req.body.discountPercentage = parseInt(req.body.discountPercentage)
     req.body.stock = parseInt(req.body.stock)

     if (req.body.position == "") {
          const countProducts = await Product.countDocuments();
          req.body.position = countProducts + 1;
     } else {
          req.body.position = parseInt(req.body.position);
     }

     const product = new Product(req.body);
     await product.save();

     res.redirect(`${systemConfig.prefixAdmin}/product`);
}
// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
     try {
          const id = req.params.id
          const product = await Product.findById(id)
          res.render("admin/pages/product/edit", {
               product: product
          })
     } catch (error) {
          res.redirect(`${systemConfig.prefixAdmin}/product`)
     }
}
// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
     const id = req.body.id

     req.body.price = parseInt(req.body.price)
     req.body.discountPercentage = parseInt(req.body.discountPercentage)
     req.body.stock = parseInt(req.body.stock)
     req.body.position = parseInt(req.body.position)

     if (req.file) {
          req.body.thumbnail = `/uploads/${req.file.filename}`
     }

     try {
          await Product.updateOne({ _id: id }, req.body)
          req.flash("success", `Cập nhật thành công`)
     } catch (error) {
          req.flash("error", `Cập nhật thất bại!`)
     }

     res.redirect("back")
}
// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
     try {
          const id = req.params.id
          const product = await Product.findById(id)
          res.render("admin/pages/product/detail", {
               pageTitle: product.title,
               product: product
          })
     } catch (error) {
          res.redirect(`${systemConfig.prefixAdmin}/product`)
     }
}