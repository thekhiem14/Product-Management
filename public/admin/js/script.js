// Được file product/index.pug gọi
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
// Bộ lọc
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// End bộ lọc

// Form Search
const formSearch = document.querySelector("#form-search")
if(formSearch){
  let url =new URL(window.location.href)

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    const keyword = e.target.elements.keyword.value

    if(keyword){
      url.searchParams.set("keyword", keyword)
    } else {
      url.searchParams.delete("keyword")
    }

    window.location.href=url.href
  })
}
// End Form Search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
  let url =new URL(window.location.href)

  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination")
  
      if(page){
        url.searchParams.set("page", page)
      } else{
        url.searchParams.delete("page")
      }
  
      window.location.href = url.href
    })
  })
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
  const inputCheckall = checkboxMulti.querySelector("input[name='checkall']")
  const inputId = checkboxMulti.querySelectorAll("input[name='id']")

  inputCheckall.addEventListener("click", () => {
    if(inputCheckall.checked){
      inputId.forEach(input =>{
        input.checked = true
      })
    }
    else{
      inputId.forEach(input =>{
        input.checked = false
      })
    }
    // End Check All

    inputId.forEach(input => {
      input.addEventListener("click", () => {
        const countChecked = checkboxMulti.querySelectorAll(
          "input[name='id']:checked"
        ).length

        if(countChecked == inputId.length) {
          inputCheckall.checked = true
        }
        else {
          inputCheckall.checked = false
        }
      })
    })
    // End Check One By One
  })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault()

    const checkboxMulti = document.querySelector("[checkbox-multi]")
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    )

    if(inputChecked.length > 0){
      let ids = []
      const inputIds = formChangeMulti.querySelector("input[name='ids']")

      inputChecked.forEach(input => {
        const id = input.value
        ids.push(id)
      })

      inputIds.value = ids.join(", ")

      formChangeMulti.submit()
    }
    else{
      alert("Vui long chon it nhat mot ban ghi")
    }
  })
}
// End Form Change Mutil