let numId = document.getElementById('numId');
let usuDocum = document.getElementById('usuDocum');
let refe = document.getElementById('refe');
let cant = document.getElementById('cant');






function crearUsuario(){
    let ordeId = Number(numId.value);
    let docu = Number(usuDocum.value);
    let refePro = Number(refe.value);
    let cantPro = Number(cant.value);


    let data = {
       OrdenID : ordeId,
       documento: docu,
       referencia:refePro,
       cantidad: cantPro
    }
    console.log(data);

    axios.post('http://localhost:5000/createOrden', data)
        .then(function(res) {
          if(res.status==200) {
          
            Swal.fire({
                icon: 'success',
                title: 'Nueva orden Creada correctamente',
                showConfirmButton: false,
                timer: 2000
            }).then(limpiar());
          }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err)
        })
}



function cargarReferencias(){
    axios.get('http://localhost:5000/referencias')
    .then(function(res) {
        console.log(res.data);
        
        var select = document.getElementById('refe');
    
         for(var i=0; i < res.data.length; i++){ 
             var option = document.createElement("option"); 
             option.value = res.data[i].REFERENCIA_ID;
             option.innerHTML = `Nombre: ${res.data[i].NOMBRE}. Stock: ${res.data[i].STOCK}. Precio: ${res.data[i].PRECIO}`;
             select.appendChild(option);
         }
        
    })
    .catch(function(err) {
      console.log(err)
    })
}

function cargarUsuarios(){
    axios.get('http://localhost:5000/usuariosOrdenes')
    .then(function(res) {
        console.log(res.data);
        
        var select = document.getElementById('usuDocum');
    
         for(var i=0; i < res.data.length; i++){ 
             var option = document.createElement("option"); 
             option.value = res.data[i].DOCUMENTO;
             option.innerHTML = res.data[i].NOMBRE_COMPLETO;
             select.appendChild(option);
         }
        
    })
    .catch(function(err) {
      console.log(err)
    })
}



function ordeCompra(){
    location.href = "file:///C:/Users/Juan/Desktop/Aplicación%20bd2/Front%20BD2/htmls/ordenCompra.html";
}


document.onload = cargarReferencias() ;
document.onload = cargarUsuarios() ;
