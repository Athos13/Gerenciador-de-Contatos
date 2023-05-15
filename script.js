const campoNome = document.getElementById("nome")
const campoEmail = document.getElementById("email")
const campoTel = document.getElementById("telefone")
const campoInsta = document.getElementById("instagram")
const campoLinkedin = document.getElementById("linkedin")

const body = document.getElementsByTagName("body")[0]
const form = document.getElementsByTagName("form")[0]
const modulo = document.getElementsByClassName("modulo-excluir")
const botaoSimModulo=document.getElementById("modulo-sim")
const botaoNaoModulo=document.getElementById("modulo-nao")

let selectOrdem = document.getElementsByTagName("select")[0]
let lista = document.getElementsByTagName("ul")[0] //ul original
let arrayDadosInput  //guarda dados de cada input naquele cadastro momentaneo
let arrayDeArray=[] //busca dados e junta com o novo dado, e é salvo no localStorage


//adiciona dados dos inputs a ul como lis
form.addEventListener("submit", function(event){
    event.preventDefault()
    arrayDadosInput=[
        campoNome.value.toUpperCase(), 
        campoEmail.value, 
        campoTel.value, 
        "id-"+Math.random().toFixed(3)*10,
        campoInsta.value,
        campoLinkedin.value
    ]

    //criando a li da lista, dando sua classe com código dela
    let liLista = document.createElement("li")
    liLista.classList.add(arrayDadosInput[3])
    let ulItem = document.createElement("ul")

    //criando botão de escluir, adicionando sua classe, adiciono seu evento e eventListener não botões sim/não
    let botaoExcluir = document.createElement("button")
    botaoExcluir.innerText="excluir"
    botaoExcluir.classList.add("excluir")

    botaoExcluir.addEventListener("click", (event)=>{
        modulo[0].classList.add("mostrar")

        botaoSimModulo.addEventListener("click",()=>{
            exclui(event)// chama função excluir com event referenciando qual botão, de qual li, chamou o evento inicial
            modulo[0].classList.remove("mostrar")//acessa classlist do htmlColection do modulo e adiciona a classe
        })
    
        botaoNaoModulo.addEventListener("click",()=>{
        modulo[0].classList.remove("mostrar")
        })
        
    })

    arrayDadosInput.map((item)=>{
        if(arrayDadosInput.indexOf(item)!==3){
            if(arrayDadosInput.indexOf(item)==1){
                let li=document.createElement("li"); 
                let link=document.createElement("a"); 
                link.href=`mailto:${item}`
                link.textContent=item
                li.appendChild(link)
                
                ulItem.appendChild(li)
                liLista.appendChild(ulItem)
                lista.appendChild(liLista)
                }
                
                else if(arrayDadosInput.indexOf(item)==2){
                let li=document.createElement("li"); 
                let link=document.createElement("a"); 
                link.href=`tel:${item}`
                link.textContent=item
                li.appendChild(link)
                
                ulItem.appendChild(li)
                liLista.appendChild(ulItem)
                lista.appendChild(liLista)
                }

                
                else if(arrayDadosInput.indexOf(item)==4||arrayDadosInput.indexOf(item)==5){
                    if(item!==""){
                    let li=document.createElement("li"); 
                    let link=document.createElement("a"); 
                    arrayDadosInput.indexOf(item)==4?link.textContent="Instagram":link.textContent="Linkedin"
                    link.href=item
                    
                    li.appendChild(link)
                    ulItem.appendChild(li)
                    liLista.appendChild(ulItem)
                    lista.appendChild(liLista)
                    }
                }
                
                else{
                let li=document.createElement("li"); 
                let textLi=document.createTextNode(item); 
                li.appendChild(textLi)
                
                ulItem.appendChild(li)
                liLista.appendChild(ulItem)
                lista.appendChild(liLista)
                
                }
            }
        ulItem.firstChild.classList.add("estilo-nome")
    })
    ulItem.appendChild(botaoExcluir)
    salvaDadosUl()
    form.reset()
    campoNome.focus()
}) 


//salva dados no localStorage
function salvaDadosUl(){
    let arrayStorage = JSON.parse(window.localStorage.getItem("array"))
    if(arrayStorage){
        arrayDeArray=[...arrayStorage,arrayDadosInput]
    }else{
        arrayDeArray.push(arrayDadosInput)
    }
    window.localStorage.setItem("array",JSON.stringify(arrayDeArray))
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


//recria lis dando link correto ou conteudo de texto, conforme o index do dado(1 e 2 são email e tel)
function recriaLis(array){
    if(array){   
        array.map((arrayFilho)=>{ //map no array principal
    
            let liLista = document.createElement("li") 
            liLista.classList.add(arrayFilho[3])
            let ulItem = document.createElement("ul")
    
        if(arrayFilho){         
            arrayFilho.map((item)=>{  //map nos arrays internos
        
            if(!item.includes("id-")){  //evita criar li para o código do cadastro atual
            if(arrayFilho.indexOf(item)==1){
            let li=document.createElement("li"); 
            let link=document.createElement("a"); 
            link.href=`mailto:${item}`
            link.textContent=item
            li.appendChild(link)
            
            ulItem.appendChild(li)
            liLista.appendChild(ulItem)
            lista.appendChild(liLista)
            }
            
            else if(arrayFilho.indexOf(item)==2){
            let li=document.createElement("li"); 
            let link=document.createElement("a"); 
            link.href=`tel:${item}`
            link.textContent=item
            li.appendChild(link)
            
            ulItem.appendChild(li)
            liLista.appendChild(ulItem)
            lista.appendChild(liLista)
            }
            
            else if(arrayFilho.indexOf(item)==4||arrayFilho.indexOf(item)==5){
                if(item!==""){
                    let li=document.createElement("li"); 
                    let link=document.createElement("a"); 
                    arrayFilho.indexOf(item)==4?link.textContent="Instagram":link.textContent="Linkedin"
                    link.href=item
                    
                    li.appendChild(link)
                    ulItem.appendChild(li)
                    liLista.appendChild(ulItem)
                    lista.appendChild(liLista)
                }
            }

            else{
            let li=document.createElement("li"); 
            let textLi=document.createTextNode(item); 
            li.appendChild(textLi)
            
            ulItem.appendChild(li)
            liLista.appendChild(ulItem)
            lista.appendChild(liLista)
            
            }}
            ulItem.firstChild.classList.add("estilo-nome")
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


//recupera dados do localStorage ao carregar do body
body.addEventListener('load', recuperaDadosGerais())
function recuperaDadosGerais(){
    let arrayFinal = JSON.parse(window.localStorage.getItem("array"))
    recriaLis(arrayFinal)  
} 


//Ordena em ordem mais recente, alfabetica e não alfabetica
 selectOrdem.addEventListener("change", function(event){
    selectOrdem.value=event.target.value //da valor do option selecionado ao select

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
    
            default:
                recriaLis(array)// recria as lis com base no array do localStorage, ou seja, na ordem de criação
        }

    })
    lista.innerText="" //remove todos os elementos filhos da .lista
    recriaLis(ordenado) //recria as lis no ordenamento escolhido
 })