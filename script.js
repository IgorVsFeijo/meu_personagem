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

        else{
            result.innerHTML = entry.value
        }
    })
});