const IVA =  x  => x * 0.21;
const suma = ( a, b ) => a + b
const boton = document.querySelector("#boton")
let nombreDeLaPersona
let saborQueElige 
let cantidadDeCajasQueQuiere
let cantidadDeSalsas
let valor
const APIURL = 'https://jsonplaceholder.typicode.com/posts' ;

$(()=>{
    $("#hacerPedido").on("click", function() {
        $("#aplicarShow").show("slow", function(){
            $("#hacerPedido").fadeOut("slow")
        })
    })
})

class Pedidos{
    constructor(nombre, sabor, cantidadDeCajas, salsa, codigo){
        this.nombre = nombre
        this.sabor = sabor
        this.cantidadDeCajas = cantidadDeCajas
        this.cantidadDeSalsas = salsa
        this.codigo = codigo
        this.valor = this.cantidadDeCajas * 350 + this.cantidadDeSalsas * 230
    }
    valorConCodigo(){
        let codigoCorrecto = $("#codigo").val();
        if (codigoCorrecto == "ABC"){
            return (this.valor * 70)/100
        }
        else{return this.valor}
    }
}
let listaDePedidos = []
const crearPedido = () => {
    let nombreDeLaPersona = document.getElementById("nombre").value;
    let saborQueElige = document.getElementById("sabor").value;
    let cantidadDeCajasQueQuiere = parseInt(document.getElementById("cajas").value);
    let cantidadDeSalsas = parseInt(document.getElementById("salsas").value);
    let ponerCodigo = $("#codigo").val();

    const pedido = new Pedidos(nombreDeLaPersona, saborQueElige, cantidadDeCajasQueQuiere, cantidadDeSalsas, ponerCodigo)
    listaDePedidos.push(pedido)
    
    let decirValor = document.createElement("p")
    let contenedor1 = document.getElementById("valorDecir")
    decirValor.innerHTML = `Perfecto! Seria un total de ${pedido.valor}. Te esperamos :D`
    contenedor1.appendChild(decirValor)

    let lista = document.createElement("li");
    let contenedor = document.getElementById("pedidosLista");
    lista.innerHTML =  `Tu nombre es ${pedido.nombre}. Pediste ${pedido.cantidadDeCajas} del sabor ${pedido.sabor} y 
    ${pedido.cantidadDeSalsas} Salsas. Seria un total de ${pedido.valor}`;
    contenedor.appendChild(lista);
    
    if(localStorage.getItem("pedidos") == null) {
        listaDePedidos.push(pedido)
        localStorage.setItem("pedidos", JSON.stringify(listaDePedidos))
    }
    else{
        let listaNuevaPedidos = JSON.parse(localStorage.getItem("pedidos"))
        listaNuevaPedidos.push(pedido)
        localStorage.setItem("pedidos", JSON.stringify(listaNuevaPedidos))
    }
    document.getElementById("nombre").value = "";
    document.getElementById("sabor").value = "";
    document.getElementById("cajas").value = "";
    document.getElementById("salsas").value = "";
}

$("#boton").on("click", (e)=>{
    e.preventDefault();
    $.ajax({
        beforeSend:function(){
            let pedidoNuevo = crearPedido()
            listaDePedidos.push(pedidoNuevo)
        },
        url: APIURL,
        method: "POST",
        data: listaDePedidos,
        success:function(resp){
            console.log(resp)
            alert("se mando con exito")
        },
        error: function(jqXHL, status, resp){
            console.log(status)
            console.log(resp)
        }
    })
})
/*boton.addEventListener("click", (e)=>{
    e.preventDefault();
    let pedidoNuevo = crearPedido()
    listaDePedidos.push(pedidoNuevo)
})*/

listaDePedidos.push(new Pedidos("sofia","especial", 4, 2))
listaDePedidos.push(new Pedidos("claudio","masa verdura", 8, 3))
listaDePedidos.push(new Pedidos("erica","masa clasica", 2, 1))

listaDePedidos.forEach(el => {
    let lista = document.createElement("li")
    lista.innerHTML =  `Tu nombre es ${el.nombre}. Pediste ${el.cantidadDeCajas} del sabor ${el.sabor} y ${el.cantidadDeSalsas}. Seria un total de ${el.valor}`
    document.getElementById("pedidosLista").appendChild(lista)
})
listaDePedidos.sort((a,b) => {
    if (a.valor > b.valor){
        return 1;
    }
    if (a.valor < b.valor){
        return -1;
    }
    return 0
})
console.log(listaDePedidos)
/*
listaDePedidos.forEach( ped => {
    console.log(suma(ped.valor, iva(ped.valor)));
    return valor
})
for (i=0; i< listaDePedidos.length ; i++){
    console.log("Tu pedido es el numero " + i + ": Tu nombre es " + nombreDeLaPersona + ". Pediste " + cantidadDeCajasQueQuiere + " cajas del sabor " + saborQueElige + " Seria un total de " + valor)
}
crearPedido()
*/