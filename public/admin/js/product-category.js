// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0) {
    const deleteForm = document.querySelector("#form-delete-item")
    const path = deleteForm.getAttribute('data-path')

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm('Bạn có chắc chắn muốn xóa không!')
            if (isConfirm) {
                const id = button.getAttribute('data-id')
                const action = `${path}/${id}?_method=DELETE`

                deleteForm.action = action

                deleteForm.submit()
        }})
    })
}
// End Delete Item