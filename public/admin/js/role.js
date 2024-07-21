// Permission
const tablePermission = document.querySelector('[table-permissions]')
if (tablePermission) {
  const buttonSubmit = document.querySelector('[button-submit]')

  buttonSubmit.addEventListener("click", () => {
    let permissions = []

    const rows = document.querySelectorAll('[data-name]')

    rows.forEach(row => {
      const name = row.getAttribute('data-name')
      const inputs = row.querySelectorAll('input')

      if (name == "id") {
        inputs.forEach(input => {
          const id = input.value

          permissions.push({
            id: id,
            permissions: []
          })
        })
      }
      else {
        inputs.forEach((input, index) => {
          const checkbox = input.checked

          if (checkbox) {
            permissions[index].permissions.push(name)
          }
        })
      }
    })
    // Send to Form Change Permissions
    if (permissions.length > 0) {
      const formChangePermisions = document.querySelector('#form-change-permissions')
      const inputPermissions = formChangePermisions.querySelector('input[name="permissions"]')
      inputPermissions.value = JSON.stringify(permissions)
      formChangePermisions.submit()
    }
    // End Send to Form Change Permissions
  })

}
// End Permission

// Display Permissions
const dataRecords = document.querySelector('[data-records]')
if(dataRecords){
  const records = JSON.parse(dataRecords.getAttribute('data-records'))
  
  records.forEach((record, index) => {
    const permissions = record.permissions
  
    permissions.forEach(permission => {
      const row = tablePermission.querySelector(`[data-name="${permission}"]`)
      const input = row.querySelectorAll('input')[index]
      
      input.checked = true
    })
  })  
}
// End Display Permissions