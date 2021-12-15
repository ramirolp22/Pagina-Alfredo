//consultas en proceso------------------------------------
$(()=>{

        class Consultas{
            constructor(email, texto){
                this.email = email
                this.texto = texto
            }
        }
        let listaConsultas = []
        const crearConsulta = ()=>{
            let nombreEmail = $(".formEmail").val()
            let textoQuePone = $(".formTexto").val()

            const consulta = new Consultas(nombreEmail, textoQuePone)

            if(localStorage.getItem("consultas") == null) {
                listaConsultas.push(consulta)
                localStorage.setItem("consultas", JSON.stringify(listaConsultas))
            }
            else{
                let listaNuevaConsultas = JSON.parse(localStorage.getItem("consultas"))
                listaNuevaConsultas.push(consulta)
                localStorage.setItem("consulta", JSON.stringify(listaNuevaConsultas))
            }
            $("#enviarConsulta").on("click", function(){
                console.log("hola")
            })
            
            $(".enviarConsulta").on("click",function(event){
                event.preventDefault()
                console.log("Hola");
                $.ajax({
                    beforeSend:function(){
                        let consultaNueva = crearConsulta()
                        listaConsultas.push(consultaNueva)
                    },
                    url: APIURL,
                    method: "POST",
                    data: listaConsultas,
                    success:function(respCons){
                        console.log(respCons)
                        $("#modal").show()
                    },
                    error: function(jqXHL, status, resp){
                        console.log(status)
                        console.log(resp)
                    }
                })
            })
        }
})