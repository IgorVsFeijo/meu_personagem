let containerEdition = document.querySelectorAll(".edit-page-container")[0]
let main = document.getElementsByTagName("main")[0]
let container = document.querySelectorAll(".character-container")[0]
let x = document.body.clientWidth

function size(){

    x = document.body.clientWidth

    if(x > 1200){
        main.style.maxWidth = "100%"
        main.style.flexWrap = ""

    }

    else{
        main.style.maxWidth = ""
        main.style.flexWrap = "wrap"
    }
}


function editionMode(){

    if(containerEdition.style.display == ""){
        containerEdition.style.display = "block"
        size()
        
    }

    else{
        containerEdition.style.display = ""
        main.style.maxWidth = ""
        main.style.flexWrap = ""
    }
}


document.body.onresize = () =>{

    if(containerEdition.style.display == "block"){
        size()
    }

    
}

let contentInputs = []

for (item of document.querySelectorAll(".content input, .content textarea")){
    contentInputs.push(item)
}

contentInputs.forEach(input => {
    input.addEventListener("input", (e)=>{

        entry = e.target
        result = document.getElementById(entry.id.replace("-input", ""))
        console.log(result.tagName)

        if(result.tagName == "IMG"){
            result.setAttribute("src", entry.value)
            console.log(result)
        }

        else if(entry.getAttribute("type") == "file"){
            result = document.getElementById(entry.id.replace("-file", ""))
            result.setAttribute("src", URL.createObjectURL(entry.files[0]))
        }

        else{
            result.innerHTML = entry.value
        }
    })
})

let editorInputs = []

for(item of document.querySelectorAll(".appearance > div input, .appearance > div select")){
    editorInputs.push(item)
}

editorInputs.forEach(input => {
    input.addEventListener("change", (e)=>{
        space = e.target

        if(space.id == "page-backgroundColor"){
            document.body.style.backgroundColor = space.value
            save(document.body)
        }
        else{
            ce = document.getElementById("current-element").value
            element = document.getElementById(ce)

            if(space.id == "font-input"){
                console.log(space.innerHTML)
                element.style.fontFamily = space.value
            }
            else{
                console.log(space.id)
                
                if(space.id == "fontSize"){
                    if(space.value < 10 || space.value > 48){
                        space.value < 10 ? space.value = 10 : space.value = 48
                    }

                    element.style[space.id] = `${space.value}px`

                }
                else{
                    element.style[space.id] = space.value

                }

                
            }

            save(element)
        }
    })
})

let arrayElements = []
let arrayLocalStorage = JSON.parse(localStorage.getItem("array"))

if(!(arrayLocalStorage == null || arrayLocalStorage == "")){
    arrayElements = arrayLocalStorage
    console.log(arrayElements)
}

function elementObject(element){
    this.id = element.getAttribute("id"),
    this.style = element.getAttribute("style")
}

function save(element){

    let index = -1

    for (i in arrayElements){
        if(arrayElements[i].id == element.getAttribute("id"))
            index = i
    }

    if(index == -1){
        arrayElements.push(new elementObject(element))
    }

    else{
        arrayElements[index] = new elementObject(element)
    }

    console.log(arrayElements)
    
    
    localStorage.setItem("array", JSON.stringify(arrayElements))
}

for (item of arrayElements){
    document.getElementById(item.id).setAttribute("style", item.style)
}

document.title = document.getElementById("name-character").innerText
