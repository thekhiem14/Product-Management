// Show Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
  const time=parseInt(showAlert.getAttribute("data-time"))
  const closeAlert = showAlert.querySelector("[close-alert]")

  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time)  
  // Sau 5 giay tu dong thong bao

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
  // Chu dong dong thong bao
}
// End Show Alert