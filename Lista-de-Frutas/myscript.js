const modelEl=document.getElementById ("model")
const listEl =document.getElementById ("list")
const addformEl = document.getElementById ("add-form")
const removeEl = document.getElementById ("remove-checked")

addformEl.addEventListener ("submit", (e) => {
    e.preventDefault ()
    const inputText = e.target [0].value 
    if (inputText ){
        e.target [0].value = ""
        addItem(inputText)
    }
})

removeEl.addEventListener("click", (e) =>{
   const checkedItems = items.filter((e) => e.checked)
   for (const item of checkedItems) {
        removeItem(item.id)
   }
})

const uuid = () =>
  Math.random().toString(32).concat(Date.now().toString(32)).replace(".", "");


let items = []

const renderModel = () => {
    modelEl.innerHTML = JSON.stringify(items,null,2)
}

const renderAddItem =(item) => {
    const labelEl = document.createTextNode(item.name)
    const itemEl  = document.createElement("li")
    itemEl.setAttribute("id",item.id)
    if (item.checked){
    itemEl.classList.add ("checked")
    }

    itemEl.addEventListener("click",(e) => {
        e.preventDefault()
        let isChecked = e.target.classList.contains ("checked")
        isChecked = !isChecked 
        updateItem({ id: e.target.id, checked: isChecked})
        
    })

      itemEl.appendChild(labelEl)
      listEl.appendChild(itemEl)
}

const renderUpdateItem = (id,checked) => {
    const itemEl  = document.getElementById(id)
    if (checked) {
        itemEl.classList.add ("checked")
    } else {
        itemEl.classList.remove ("checked")
    }
}

const renderRemoveItem = (id) => {
    const itemEl = document.getElementById (id)
    itemEl.remove()
}

const addItem = (label, checked = false ) => {
      const item = { 
        id: "item-" + uuid(),
        name: label,
        checked
      }
    items.push(item)
    renderAddItem(item)
    renderModel ()
}

const removeItem = (id) =>{
      items = items.filter (i => i.id !== id)
      renderRemoveItem (id)
      renderModel()
      
}

const updateItem = ({id, checked}) => {
      const item = items.find (i => i.id === id)
      if (item){
        item.checked = checked
      }
      renderUpdateItem(id, checked)
      renderModel ()
}

addItem("Cereza")
addItem("Zarzamora")
addItem("Frambuesa" , true)
addItem("Maracuya")

