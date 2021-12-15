
let cantidadDeCajasCarrito
let contador = 0
let totalPrecio
const APIURL = `https://jsonplaceholder.typicode.com/posts`
$(()=>{
    //animaciones principales----------------------------------
    $("#botonAntesDelPedido").on("click", function() {
        $("#antesDelPedido").slideUp("slow", function(){
            $("#elijoPromo").show("slow", function(){
            })
        })
    })

    $(".raviolones").on("click", function(){
        $(".promos").slideUp("slow", function(){
            $(".carritoYBoton").slideDown("slow", function(){
                $(".mostrarBotonR").show("slow", function(){
                    $(".mostrarBotonS").hide("slow")
                })
            })
        })
    })
    $(".sorrentinos").on("click", function(){
        $(".promos").slideUp("slow", function(){
            $(".carritoYBoton").slideDown("slow", function(){
                $(".mostrarBotonS").show("slow",function(){
                    $(".mostrarBotonR").hide("slow")
                })
            })
        })
    })
//limites de cajas
    $("#CR").on("click", function(){
        contador += 1
    })
    $("#CS").on("click", function(){
        contador += 1
    })
    $("#promo1").on("click", function(){
        contador += 2
    })
    $("#promo2").on("click", function(){
        contador += 2
    })
    $("#promo3").on("click",function(){
        contador += 4
    })
    $("#promo4").on("click",function(){
        contador += 6
    })
//cuando terminas de encargar----------------------------------------------------
    $("#volver").on("click", function(){
        $(".resumen").slideUp("slow", function(){
            $(".carritoYBoton").hide("fast",function(){
                $(".promos").show("fast",function(){
                    $("#elijoPromo").show("slow",function(){
                        $(".remove").hide()
                    })
                })
            })
        })
    })
    $("#terminar").on("click", function(){
        $(".carrito_boton").hide("slow", function(){
            $(".pequenioForm").show("slow")
        })
    })
//ajax-------------------------------------------------------------
    $("#confirmarPedido").on("click",function(){
        event.preventDefault();
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
                $(".pequenioForm").slideUp("slow",function(){
                    $(".conclusion").append(`<div>
                                                <h3>Muchas gracias, ${$("#nombre").val()}!</h3>
                                                <p>El pedido se confirmo con exito. El sabado entre las 12 y 17hs te esperamos!</p>
                                         </div>`)
                })
            },
            error: function(jqXHL, status, resp){
                console.log(status)
                console.log(resp)
            }

        })
    })
    //calcular cantidad de producto en el carrito-------------------------------
    const cantidadCarrito = ()=>{
        let cantidadDeCajasCarrito = $(".list-items").children().length
        $(".elejisteCajas").text(`Elegiste ${cantidadDeCajasCarrito} cajas`);
        if($(".list-items").children().length === contador && $(".list-items").children().length != 0){
            $(".list-items-resumen").text(`${$(".list-items").text()}`)
            $("#elijoPromo").hide("slow",function(){
                $(".agregar").hide("fast", function(){
                    $(".resumen").slideDown("slow")
                })
                
            })
        }
        return cantidadDeCajasCarrito
    }
    //calcular precio--------------------------------------------------------
    const precioTotal = ()=>{
         totalPrecio = 0;
        $(".eachPrice").each(function(){
            let precioPromo = parseInt($(this).text());
            totalPrecio += precioPromo
        })
        $(".carrito_total").text(`${totalPrecio}`);
        return totalPrecio
    }
    //carrito--------------------------------------------------------------
    $(".promos_opcion").on("click", function(){

        let nombreDeLaPromo = $(this).find(".nombrePromo").text()
        $(".list-promos").append(`<li class = "list-cosas col-12">${nombreDeLaPromo}</li>`)

        let precioDeLaPromo = parseInt($(this).find(".price").text())
        let precioDeLaPromoEscrito = `<span class= "eachPrice">${precioDeLaPromo} </span>`
        $(".arreglo").append(`<p>Total = ${precioDeLaPromoEscrito}</p>`)
        precioTotal()
    })
    $(".agregar").on("click", function(){
        let nombreDelProducto = $(this).siblings("h3").text()
        let remove = `<button class="remove">X</button>`;

        $(".list-items").append(`<li class = "list-cosas col-12 ">${nombreDelProducto} - ${remove}</li`)
        cantidadCarrito()

        $(".remove").on("click", function(){
            $(this).parent().remove();
            cantidadCarrito();
        })
    })
    //constructor-------------------------------------------------------
    class Pedidos{
        constructor(nombre, promos, cantidadDeCajas, total){
            this.nombre = nombre
            this.promos = promos
            this.cantidadDeCajas = cantidadDeCajas
            this.total = total
        }
    }
    let listaDePedidos = []
    const crearPedido = ()=>{
        let nombreDeLaPersona = $("#nombre").val();
        let saborQueElige = $(".list-items-resumen").text()
        let promosQueElige = $(".list-promos").text()
        let valorUsuario = totalPrecio

        const pedido = new Pedidos(nombreDeLaPersona, promosQueElige, saborQueElige, valorUsuario)

        if(localStorage.getItem("pedidos") == null) {
            listaDePedidos.push(pedido)
            localStorage.setItem("pedidos", JSON.stringify(listaDePedidos))
        }
        else{
            let listaNuevaPedidos = JSON.parse(localStorage.getItem("pedidos"))
            listaNuevaPedidos.push(pedido)
            localStorage.setItem("pedidos", JSON.stringify(listaNuevaPedidos))
        }
    }
})