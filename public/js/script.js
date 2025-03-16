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

// Bach to top
document.addEventListener("DOMContentLoaded", function () {
  var backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
// End Bach to top