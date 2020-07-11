let numId = document.getElementById('numId');
let usuDocum = document.getElementById('usuDocum');
let refe = document.getElementById('refe');
let cant = document.getElementById('cant');
let proveID = document.getElementById('prove');

function crearOrden(){
    let ordeId = Number(numId.value);
    let docu = Number(usuDocum.value);
    let refePro = Number(refe.value);
    let cantPro = Number(cant.value);
    let pro= Number(proveID.value);

    let data = {
       OrdenID : ordeId,
       documento: docu,
       referencia:refePro,
       cantidad: cantPro,
       proveedor: pro
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




function cargarProveedores(){
    axios.get('http://localhost:5000/proveedores')
    .then(function(res) {
        console.log(res.data);
        
        var select = document.getElementById('prove');
    
         for(var i=0; i < res.data.length; i++){ 
             var option = document.createElement("option"); 
             option.value = res.data[i].PROVEEDOR_ID;
             option.innerHTML = `Nombre: ${res.data[i].NOMBRE}. DIRECCION: ${res.data[i].DIRECCION}`;
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



function cargarOrdenes(){
    axios.get('http://localhost:5000/ordenes')
    .then(function(res) {
        
  
        let s = document.getElementById('list');
      
        for (var i = 0; i < res.data.length; i++) {
            const fecha = res.data[i].FECHA;
            let fechaOr = fecha.split('T');

              var hilera = document.createElement("li");
              var celda = document.createElement("div");
              hilera.classList.add('list-group-item');
              var textoCelda = document.createTextNode(`Número de Orden: ${res.data[i].ORDEN_DE_COMPRA_ID}.  ` + `  Fecha: ${fechaOr[0]}  ` + `  Cantidad de Productos: ${res.data[i].CANTIDAD}`+ `  Precio: : ${res.data[i].PRECIO_TOTAL}`);
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              s.appendChild(hilera);
          }
           

    })
    .catch(function(err) {
      console.log(err)
    })
}



function limpiar (){
     numId.value= '';
     usuDocum.value= '';
     refe.value= '';
     cant.value= '';
     proveID.value= '';

     var div = document.getElementById('list');
     while (div.firstChild) {
         div.removeChild(div.firstChild);
     }
    cargarOrdenes();
}


function ordeCompra(){
    location.href = "file:///C:/Users/Juan/Desktop/Aplicación%20bd2/Front%20BD2/htmls/ordenCompra.html";
}

document.onload = cargarOrdenes() ;
document.onload = cargarReferencias() ;
document.onload = cargarProveedores() ;
document.onload = cargarUsuarios() ;
