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
            }
        })
    })
}
// End Delete Item

// Change Status
const buttonChangeStatus = document.querySelectorAll('[button-change-status]')
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status')
    const path = formChangeStatus.getAttribute('data-path')

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute('data-status') == "active" ? "inactive" : "active"
            const id = button.getAttribute('data-id')

            const action = `${path}/${id}/${status}?_method=PATCH`
            formChangeStatus.action = action

            formChangeStatus.submit()
        })
    })
}
// End Change Status