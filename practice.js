// form để link đến path
// Thay đổi active <=> inactive

// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus("data-path")
    buttonChangeStatus.forEach(button, () => {
        button.appListener("click", () => {
            const statusCurrent = buttonChangeStatus("data-status")
            const statusChange = statusCurrent == "active" ? "inactive" : "active"
            const id = buttonChangeStatus("data-id")

            const action = path+ `/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action=action

            formChangeStatus.submit()
        })
    })
}
// End Change Status

// Change Multi Status
const formChangeMulti = document.querySelectorAll("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.appListener("submit", (e) => {
        e.preventDefault()
// Chọn form-change-multi
        const checkBoxMulti = document.querySelectorAll("[checkbox-multi]")
        const inputChecked = checkBoxMulti.querySelectorAll("[name='id'] : checked")
// Chọn check-box

        if(inputChecked.length > 0){
            let ids=[]
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            checkBoxMulti.forEach(item, () => {
                const itemId=item.value
                ids.push(itemId)
            })
            // Duyệt lần luột checked-box rồi lấy id bỏ vào trong array
            inputIds.value=ids.join(", ") 
            // Chuyển array thành string bỏ vào trong value của form-change-multi
            formChangeMulti.submit()
            // Update id của form-change-string
        }
        else{
            alert("Vui long chon it nhat mot abc")
        }
    })

}
// End Change Multi Status


