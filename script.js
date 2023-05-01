const campoNome = document.getElementById("nome")
const campoEmail = document.getElementById("email")
const campoTel = document.getElementById("telefone")
const body = document.getElementsByTagName("body")[0]
const botao = document.getElementsByTagName("button")[0]
const modulo = document.getElementsByClassName("modulo-excluir")
const botaoSimModulo=document.getElementById("modulo-sim")
const botaoNaoModulo=document.getElementById("modulo-nao")

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
    recriaLis(arrayFinal)  
} 



function recriaLis(array){
    if(array){   
        array.map((item)=>{
    
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
            ulItem.firstChild.classList.add("estilo-nome")
        }
        })
    
            let botaoExcluir = document.createElement("button")
            botaoExcluir.innerText="excluir"
            botaoExcluir.classList.add("excluir")
            botaoExcluir.addEventListener("click", (event)=>{
                modulo[0].classList.add("mostrar")
                botaoSimModulo.addEventListener("click",()=>{
                    exclui(event)
                    modulo[0].classList.remove("mostrar")
                })
                botaoNaoModulo.addEventListener("click",()=>{
                modulo[0].classList.remove("mostrar")
                })
            })
            ulItem.appendChild(botaoExcluir)
    
        }
        })
    }
}




//remove item do DOM e do localStorage, filtrando items do array que são diferentes da classe da li pai 
function exclui(event){
let ulBotao=event.target.parentNode//ul pai do botão
let paiUlBotao = ulBotao.parentNode//li da .lista (pai da ul do botão)
let idLi=paiUlBotao.classList[0] //valor da classe id 

let arrayFinal = JSON.parse(window.localStorage.getItem("array"))
let arrayFiltrado = arrayFinal.filter((item) => item[3] !== idLi )
window.localStorage.setItem("array",JSON.stringify(arrayFiltrado))
paiUlBotao.remove()
}



//adiciona dados dos inputs a ul como lis
botao.addEventListener("click", function(event){
    event.preventDefault()
    arrayDadosInput=[campoNome.value.toUpperCase(), campoEmail.value, campoTel.value, "id-"+Math.random().toFixed(3)*10]

    let liLista = document.createElement("li")
    liLista.classList.add(arrayDadosInput[3])
    
    let ulItem = document.createElement("ul")

    let botaoExcluir = document.createElement("button")
    botaoExcluir.innerText="excluir"
    botaoExcluir.classList.add("excluir")
    botaoExcluir.addEventListener("click", (event)=>{
        modulo[0].classList.add("mostrar")
        botaoSimModulo.addEventListener("click",()=>{
            exclui(event)
            modulo[0].classList.remove("mostrar")
        })
        botaoNaoModulo.addEventListener("click",()=>{
        modulo[0].classList.remove("mostrar")
        })
        
    })

    arrayDadosInput.map((item)=>{
        if(arrayDadosInput.indexOf(item)!==3){
            let li=document.createElement("li"); 
            let textLi=document.createTextNode(item); 
            li.appendChild(textLi)

            
            ulItem.appendChild(li)
            liLista.appendChild(ulItem)
            lista.appendChild(liLista)
        }
        ulItem.firstChild.classList.add("estilo-nome")
    })

    ulItem.appendChild(botaoExcluir)
    pegaDadosUl()

    
    campoNome.focus()

}) 


//Ordena em ordem alfabetica e não alfabetica
let selectOrdem = document.getElementsByTagName("select")[0]

 selectOrdem.addEventListener("change", function(event){
    selectOrdem.value=event.target.value

    let array=JSON.parse(window.localStorage.getItem("array"))

    let ordenado=array.sort((a,b)=>{
        switch(selectOrdem.value){
            case "alfabetica":
                if(a[0]>b[0]){
                    return 1
                }
                else if(a[0]<b[0]){
                    return-1
                }
                else{
                    return 0
                }
            break;
    
            case "nao-alfabetica":
                if(a[0]>b[0]){
                    return-1
                }
                else if(a[0]<b[0]){
                    return +1
                }
                else{
                    return 0
                }
            break;
    
        }
    })
    lista.innerText="" //remove todos os elementos filhos da .lista
    recriaLis(ordenado) //recria as lis no ordenamento escolhido

 })