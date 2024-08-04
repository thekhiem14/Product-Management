// Change quantity of products
const inputsQuantity = document.querySelectorAll('input[name="quantity"]')
if(inputsQuantity.length > 0){
  inputsQuantity.forEach( input => {
    input.addEventListener("change", () => {
      const quantity = input.value
      const productId = input.getAttribute('item-id')
      
      window.location.href = `cart/update/${productId}/${quantity}`
    })
  })

}
// End change quantity of products