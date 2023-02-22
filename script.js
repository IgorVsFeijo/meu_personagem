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
        check()
        save(result)
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
    this.text = element.innerHTML
}

function save(element){
    console.log(element)
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
    if(!(item.id == "body")){
        if(item.text != "" && item.text != null){
            document.getElementById(item.id).innerHTML = item.text
        }
    }
}

if(document.getElementById("img").src.trim == ""){
    document.getElementById("img").src = "imgs/edit-icon.svg"
}

let arraySpaces = []

for(item of document.getElementsByClassName("about")[0].children){
    arraySpaces.push(item)
}

check()

function check(){
    console.log("chamou")
    arraySpaces.forEach(ch => {
    console.log(ch.innerHTML.trim())
    if(ch.innerHTML.trim() == ""){
        switch(ch.id){
            case "name-character":
                ch.innerHTML = "NOME DO PERSONAGEM"
            break
            case "subtitle":
                ch.innerHTML = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis provident officia!"
            break
            case "text":
                ch.innerHTML = "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis neque dignissimos dolore tenetur assumenda ratione nihil velit commodi distinctio unde. Natus perspiciatis possimus quidem deserunt fuga iusto itaque magni totam?</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quia laudantium ducimus dolorem ut libero, architecto tempora omnis sed odit ratione at veniam aspernatur fugit mollitia. Incidunt eum itaque esse.</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci fugit possimus, temporibus excepturi ipsam, autem exercitationem odio soluta officia molestias perferendis omnis, nihil porro maxime incidunt placeat impedit nisi? Perferendis?</p>"
            break
            }
        }
    })
}


