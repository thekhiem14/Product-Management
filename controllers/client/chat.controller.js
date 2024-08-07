const Chat = require("../../models/chat.model")
const User = require("../../models/user.model")

module.exports.index = async (req, res) => {
  const userId = res.locals.user.id

  // SocketIO
  _io.once('connection', (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // Lưu vào DB
      const chat = new Chat({
        user_id: userId,
        content: content
      })
      await chat.save()
    })
  })
  // End SocketIO

  // Lất data từ DB
  const chats = await Chat.find({
    deleted: false
  })

  for(const chat of chats){
    const infoUser = await User.findOne({
      _id: chat.user_id
    }).select("fullName")

    chat.infoUser = infoUser
  }
  // End lất data từ DB
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats
  })
}