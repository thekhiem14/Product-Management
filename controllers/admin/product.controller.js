const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
const Account = require("../../models/account.model")

const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helper/filterStatus")
const searchHelper = require("../../helper/search")
const pagiantionHelper = require("../../helper/pagination")
const createTreeHelper = require("../../helper/createTree")

// [GET] /admin/product
module.exports.product = async (req, res) => {
     // Filter Status
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
     // End Filter Status

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

     // Lấy ra thông tin người tạo
     for(const item of product){
          const person = await Account.findOne({
               _id: item.createdBy.account_id
          })
          if(person){
               item.personCreated = person.fullName
          }

          // Lấy ra thông tin người cập nhật gần nhất
          const updatedBy = item.updatedBy.slice(-1)[0]
          if(updatedBy) {
               const userUpdated = await Account.findOne({
                    _id: updatedBy.account_id
               })
               console.log(updatedBy)
               console.log(userUpdated)
               updatedBy.accountFullName = userUpdated.fullName
          }
     }

     res.render("admin/pages/product/index", {
          product: product,
          filterStatus: filterStatus,
          keyword: objectSearch.keyword,
          pagination: objectPagination,
          pageTitle: "Trang sản phẩm",
     })
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
     const status = req.params.status
     const id = req.params.id

     const updatedBy= {
          account_id: res.locals.user.id,
          updatedAt: new Date()
     }

     await Product.updateOne({ _id: id }, { status: status, $push: { updatedBy: updatedBy } })

     req.flash("success", "Cap nhat trang thai thanh cong")
     // Cập nhật dữ liệu trong database
     res.redirect("back")
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
     const type = req.body.type
     const ids = req.body.ids.split(", ")

     const updatedBy= {
          account_id: res.locals.user.id,
          updatedAt: new Date()
        }

     switch (type) {
          case "active":
               await Product.updateMany({ _id: { $in: ids } }, {
                    status: "active" ,
                    $push: { updatedBy: updatedBy}

               })
               req.flash("success", `Cap nhat trang thai thanh cong ${ids.length} san pham`)
               break;
          case "inactive":
               await Product.updateMany({ _id: { $in: ids } }, { 
                    status: "inactive",
                    $push: {updatedBy: updatedBy}
               })
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

                    await Product.updateOne({ _id: id }, { position: position, 
                         $push: {updatedBy: updatedBy}
                    })
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
          deletedBy: {
               account_id:res.locals.user.id,
               deletedAt: new Date()
          }
          // Cập nhật ngày xóa
     })
     req.flash("success", `Xóa thành công sản phẩm`)
     // Xóa mềm  

     res.redirect("back")
}

// [GET] /admin/product/creat
module.exports.creat = async (req, res) => {
     let find = {
          deleted: false,
        }
      
        const category = await ProductCategory.find(find);
      
        const newCategory = createTreeHelper.tree(category)
     res.render("admin/pages/product/create", {
          category: newCategory
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

     req.body.createdBy = {
          account_id: res.locals.user.id
     }

     const product = new Product(req.body);
     await product.save();

     res.redirect(`${systemConfig.prefixAdmin}/product`);
}
// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
     try {
          let find = {
               deleted: false,
          }
          
          const category = await ProductCategory.find(find);
          
          const newCategory = createTreeHelper.tree(category)

          const id = req.params.id
          const product = await Product.findById(id)
          
          res.render("admin/pages/product/edit", {
               pageTitle: "Chỉnh sửa sản phẩm",
               product: product,
               category: newCategory
          })
     } catch (error) {
          res.redirect(`${systemConfig.prefixAdmin}/product`)
     }
}
// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
     const id = req.params.id
     
     req.body.price = parseInt(req.body.price)
     req.body.discountPercentage = parseInt(req.body.discountPercentage)
     req.body.stock = parseInt(req.body.stock)
     req.body.position = parseInt(req.body.position)
     try {
          const updatedBy = {
               account_id: res.locals.user.id,
               updatedAt: new Date()
          } 
          await Product.updateOne({_id: id}, {
               ...req.body,
               $push: { updatedBy: updatedBy }
          });
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