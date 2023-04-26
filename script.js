const campoNome = document.getElementById("nome")
const campoEmail = document.getElementById("email")
const campoTel = document.getElementById("telefone")

const body = document.getElementsByTagName("body")[0]
const botao = document.getElementsByTagName("button")[0]

let lista = document.getElementsByTagName("ul")[0] //ul original
let arrayDadosInput  //guarda dados de cada input naquele cadastro momentaneo
let arrayDeArray=[]

 
function pegaDadosUl(){
    let arrayStorage = JSON.parse(window.localStorage.getItem("array"))

    if(arrayStorage){
        arrayDeArray=[...arrayStorage,arrayDadosInput]
    }else{
        arrayDeArray.push(arrayDadosInput)
    }
    
    window.localStorage.setItem("array",JSON.stringify(arrayDeArray))
}




body.addEventListener('load', recuperaDadosGerais())
function recuperaDadosGerais(){
    let arrayFinal = JSON.parse(window.localStorage.getItem("array"))

    if(arrayFinal){   
    arrayFinal.map((item)=>{

        let liLista = document.createElement("li") 
        liLista.classList.add(item[3])
        let ulItem = document.createElement("ul")

    if(item){        
        item.map((item)=>{
    
        if(!item.includes("id-")){
        let li=document.createElement("li"); 
        let textLi=document.createTextNode(item); 
        li.appendChild(textLi)
        
        ulItem.appendChild(li)
        liLista.appendChild(ulItem)
        lista.appendChild(liLista)
    }
    })

        let botaoExcluir = document.createElement("button")
        botaoExcluir.innerText="excluir"
        botaoExcluir.classList.add("excluir")
        botaoExcluir.addEventListener("click", exclui)
        ulItem.appendChild(botaoExcluir)

    }
    })
} 
} 



//remove item do DOM e do localStorage, filtrando items do array que são diferentes da classe da li pai 
function exclui(event){
let ulBotao=event.target.parentNode
let paiUlBotao = ulBotao.parentNode
let idLi=paiUlBotao.classList[0] 

let arrayFinal = JSON.parse(window.localStorage.getItem("array"))
let arrayFiltrado = arrayFinal.filter((item) => item[3] !== idLi )
window.localStorage.setItem("array",JSON.stringify(arrayFiltrado))
paiUlBotao.remove()
}



//adiciona dados dos inputs a ul como lis
botao.addEventListener("click", function(event){
    event.preventDefault()
    arrayDadosInput=[campoNome.value, campoEmail.value, campoTel.value, "id-"+Math.random().toFixed(3)*10]

    let liLista = document.createElement("li")
    liLista.classList.add(arrayDadosInput[3])
    
    let ulItem = document.createElement("ul")

    let botaoExcluir = document.createElement("button")
    botaoExcluir.innerText="excluir"
    botaoExcluir.classList.add("excluir")
    botaoExcluir.addEventListener("click", exclui)

    arrayDadosInput.map((item)=>{
        if(arrayDadosInput.indexOf(item)!==3){
            let li=document.createElement("li"); 
            let textLi=document.createTextNode(item); 
            li.appendChild(textLi)

            
            ulItem.appendChild(li)
            liLista.appendChild(ulItem)
            lista.appendChild(liLista)
        }
    })

    ulItem.appendChild(botaoExcluir)
    pegaDadosUl()

    
    campoNome.focus()

}) 




