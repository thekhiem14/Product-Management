const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgot-pasword.model")
const md5 = require("md5")

const sendMailHelper = require("../../helper/sendMail")
const generateHelper = require("../../helper/generate")

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Kết quả tìm kiếm",
  });
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const exitsEmail = await User.findOne({
    email: req.body.email
  })

  if(exitsEmail){
    req.flash("error", "Email đã tồn tại")
    res.redirect("back")
    return
  }

  req.body.password = md5(req.body.password)

  const user = new User(req.body)
  await user.save()

  res.cookie("tokenUser", user.tokenUser)

  res.redirect("/")
}

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Trang đăng nhập"
  })
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({
    email: email,
    deleted: false,
    status: "active"
  })

  if(!user){
    req.flash("error", "Tài khoản không tồn tại")
    res.redirect("back")
    return
  }

  if(md5(password) != user.password){
    req.flash("error", "Sai mật khẩu")
    res.redirect("back")
    return
  }

  res.cookie("tokenUser", user.tokenUser)
  res.redirect("/")
}

// [GET] /user/password.forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu"
  })
}

// [POST] /user/password.forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email
  
  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if(!user){
    req.flash("error", "Email không tồn tại")
    res.redirect("back")
    return
  }
  
  // Lưu thông tin vào database
  const otp = generateHelper.generateRandomNumber(8)

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  }
  
  const forgotPassword = new ForgotPassword(objectForgotPassword)
  await forgotPassword.save()

  // Nếu tồn tại gửi OTP qua email
  const subject = "Mã OTP xác minh lấy lại mật khẩu"
  const html = `Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Thời hạn là 3 phút`
  sendMailHelper.sendMail(email, subject, html)

  res.redirect(`/user/password/otp?email=${email}`)

}

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  email = req.query.email

  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email
  })
}

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  email = req.body.email
  otp = req.body.otp

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  });

  if(!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
}

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne({
    tokenUser: tokenUser
  }, {
    password: md5(password)
  });

  res.redirect("/");
};

// [GET] /user/info
module.exports.info = async (req, res) => {
  res.render("client/pages/user/info", {
    pageTitle: "Thông tin tài khoản",
  });
};