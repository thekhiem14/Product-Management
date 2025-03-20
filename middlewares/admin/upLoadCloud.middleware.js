const uploadToCloudinary = require('../../helper/uploadToCloudinary')
module.exports.upload = async (req, res, next) => {
    console.log(1)
    console.log(req.file)
    if (req.file) {
        console.log(12)
        console.log(req.file)
        const link = await uploadToCloudinary(req.file.buffer)
        req.body[req.file.fieldname] = link
    }
    next()
}