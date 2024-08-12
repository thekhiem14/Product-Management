import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

// File-upload-with-preview
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
  multiple: true,
  maxFileCount: 6
})
// End File-upload-with-preview

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form")
if(formSendData){
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault()
    const content = e.target.elements.content.value
    const images = upload.cachedFileArray

    if(content || images.length > 0){
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images
      })
      e.target.elements.content.value=""
      upload.resetPreviewPanel()
      socket.emit("CLIENT_SEND_TYPING", "hidden")
    }
  })
}
// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id")
  const body = document.querySelector(".chat .inner-body")
  const boxTyping = document.querySelector(".chat .inner-list-typing")

  const div = document.createElement("div")
  let htmlFullName =""
  let htmlContent =""
  let htmlImages =""

  if(myId == data.userId){
    div.classList.add("inner-outgoing")
  } else{
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`
    div.classList.add("inner-incoming")
  }
  
  if(data.content){
    htmlContent = `<div class="inner-content">${data.content}</div>`
  }

  if(data.images.length > 0){
    htmlImages += `<div class ="inner-images">`
    
    for(const image of data.images){
      htmlImages += `<img src="${image}">`
    }

    htmlImages += `</div>`
  }

  div.innerHTML = `
    ${htmlFullName}
    ${htmlContent}
    ${htmlImages}
  `

  body.insertBefore(div, boxTyping)

  bodyChat.scrollTop = bodyChat.scrollHeight
  //Preview Image 
  const gallery = new Viewer(div)
  //End Preview Image 
})
// End SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body")
if(bodyChat){
  bodyChat.scrollTop = bodyChat.scrollHeight
}
// End Scroll Chat To Bottom

// Show Icon Chat
// Show Popup
const buttonIcon = document.querySelector('.button-icon')
if(buttonIcon){
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(buttonIcon, tooltip)

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown")
  }
}
// End Show Popup

// Show Typing
var timeOut
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show")

  clearTimeout(timeOut)

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden")
  }, 2000)
}
// End Show Typing

// Insert Icon To Input
const emojiPicker = document.querySelector("emoji-picker")
if(emojiPicker){
  const inputChat = document.querySelector(".chat .inner-form input[name='content']")
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode
    inputChat.value = inputChat.value + icon

    const end = inputChat.value.length
    inputChat.setSelectionRange(end, end)
    inputChat.focus()

    showTyping()
  })

  // Input Keyup

  inputChat.addEventListener("keyup", () => {
    showTyping()
  })
  // End Input Keyup
}
// End Insert Icon To Input
// End Show Icon Chat

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing")

if(elementListTyping){
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if(data.type == "show"){
      const exitTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`)

      if(!exitTyping){
        const boxTyping = document.createElement("div")
        boxTyping.classList.add("box-typing")
        boxTyping.setAttribute("user-id", data.userId)
  
        boxTyping.innerHTML = `
          <div class="inner-name">${data.fullName}</div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>`
  
        elementListTyping.appendChild(boxTyping)
        bodyChat.scrollTop = bodyChat.scrollHeight
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`)
      if(boxTypingRemove){
        elementListTyping.removeChild(boxTypingRemove)
      }
    }
  })
}
// End SERVER_RETURN_TYPING

// Preview Full Image
const bodyChatPreviewImage = document.querySelector(".chat .inner-body")
if(bodyChatPreviewImage){
  const gallery = new Viewer(bodyChatPreviewImage)
}
// End Preview Full Image