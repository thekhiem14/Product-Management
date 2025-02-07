
const ProductCategory = require("../../models/product-category.model")

const filterStatusHelper = require("../../helper/filterStatus")
const pagiantionHelper = require("../../helper/pagination")
const systemConfig = require("../../config/system")

const createTreeHelper = require("../../helper/createTree")
// [GET] /admin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  // Filter Status
  const filterStatus = filterStatusHelper(req.query)
  
  if(req.query.status){
    find.status = req.query.status
  }
  // End Filter Status

  //  Pagination
  const countProductCategoty = await ProductCategory.countDocuments(find)
  let objectPagination = pagiantionHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countProductCategoty
  )
  //  End Pagiantion

  const records = await ProductCategory
    .find(find)
    .skip(objectPagination.skip);

  const newRecords = createTreeHelper.tree(records)

  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
    filterStatus: filterStatus,
    pagination: objectPagination 
  });
};

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records)
  
  res.render("admin/pages/product-category/create", {
    pageTitle: "Danh muc san pham",
    records: newRecords
  })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  const permissions = res.locals.role.permissions

  if(permissions.includes("products-category_create")){
    if (req.body.position == "") {
      const count = await ProductCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
  
    const record = new ProductCategory(req.body);
    await record.save();
  }
  else{
    return
  }

  res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id
    }
    const record = await ProductCategory.findOne(find)
  
    let findRecord = {
      deleted: false
    }
    const records = await ProductCategory.find(findRecord)
    const newRecords = createTreeHelper.tree(records)
    
    res.render("admin/pages/product-category/edit", {
      record: record,
      records: newRecords
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/product-category`)
  }
}

// [PATCH] /admin/product-category/edit/:id
module.exports.editPost = async (req, res) => {
  const id = req.params.id
  req.body.position = parseInt(req.body.position)
  try {
    await ProductCategory.updateOne({ _id: id }, req.body)
    req.flash("success", `Cập nhật thành công`)
  } catch (error) {
      req.flash("error", `Cập nhật thất bại!`)
  }

  res.redirect("back");
}

// [GET] /admin/product-category/detail/:id
module.exports.detail = async (req, res) => {
  let find = {
    _id: req.params.id
  }
  const record = await ProductCategory.findOne(find)

  let parentId =''
    if(record.parent_id){
      let findParent = {
      _id: record.parent_id
    }
    const parent = await ProductCategory.findOne(findParent)
    parentId = parent.pageTitle
    }
    
  res.render("admin/pages/product-category/detail", {
    record: record,
    parentId: parentId
  })
}

// [DELETE] /admin/product-category/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id

  await ProductCategory.deleteOne({_id : id})

  req.flash("success", `Xóa thành công sản phẩm`)

  res.redirect("back")
}

// [PATH] /admin/product-category/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id
  const status = req.params.status

  await ProductCategory.updateOne({_id: id}, { status: status })
  req.flash("success", 'Cập nhật trạng thái thành công')

  res.redirect("back")
}

