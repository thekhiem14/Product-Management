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
if (formSearch) {
  let url = new URL(window.location.href)

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    const keyword = e.target.elements.keyword.value

    if (keyword) {
      url.searchParams.set("keyword", keyword)
    } else {
      url.searchParams.delete("keyword")
    }

    window.location.href = url.href
  })
}
// End Form Search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if (buttonPagination) {
  let url = new URL(window.location.href)

  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination")

      if (page) {
        url.searchParams.set("page", page)
      } else {
        url.searchParams.delete("page")
      }

      window.location.href = url.href
    })
  })
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckall = checkboxMulti.querySelector("input[name='checkall']")
  const inputId = checkboxMulti.querySelectorAll("input[name='id']")

  inputCheckall.addEventListener("click", () => {
    if (inputCheckall.checked) {
      inputId.forEach(input => {
        input.checked = true
      })
    }
    else {
      inputId.forEach(input => {
        input.checked = false
      })
    }
    // End Check All

    inputId.forEach(input => {
      input.addEventListener("click", () => {
        const countChecked = checkboxMulti.querySelectorAll(
          "input[name='id']:checked"
        ).length

        if (countChecked == inputId.length) {
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

const formChangeMulti = document.querySelector("[form-change-multi");
if (formChangeMulti) {
    formChangeMulti, addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        const typeChange = e.target.elements.type.value;

        if (typeChange == "delete-all") {
            const isConfirm = connpfirm("Bạn có chắc muốn xóa sản phẩm này?");

            if (!isConfirm) {
                return;
            }
        }


        if (inputChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputChecked.forEach(input => {
                const id = input.value;

                if (typeChange == "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name = 'position']").value;
                    
                   ids.push(`${id}-${position}`);

                }
                else { 
                    ids.push(id);
                }

            })

            inputIds.value = ids.join(", ")

            formChangeMulti.submit()
        }
        else {
            alert("Vui lòng chọn ít nhất một bản ghi")
        }
    })
}
//End Form Change Multi

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
  console.log(showAlert)
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End Upload Image

// Sort

const sort = document.querySelector("[sort]");
  if(sort) {
    let url = new URL(window.location.href)

    // Sap xep
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]")

    sortSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      const [sortKey, sortValue] = value.split("-")
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);

      window.location.href = url.href;
    })

    // Xoa sap xep
    sortClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");

      window.location.href = url.href;

    })


    // Them selected cho option
    const sortKey =  url.searchParams.get("sortKey");
    const sortValue =  url.searchParams.get("sortValue");
    if(sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelected.selected = true
    }
}
//End Sort