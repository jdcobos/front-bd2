let tipD = document.getElementById('tipD');
let numeDo = document.getElementById('numeDo');
let area = document.getElementById('area');
let nombreCo = document.getElementById('nombreCo');
let primerApe = document.getElementById('primerApe');
let segundoApe = document.getElementById('segundoApe');
let fecha = document.getElementById('fecha');

function crearUsuario(){
    let tD = Number(tipD.value);
    let nDo = Number(numeDo.value);
    let ar = Number(area.value);
    let noCo = nombreCo.value;
    let priApe = primerApe.value;
    let seApe = segundoApe.value;
    let fec = fecha.value;
    let forFecha = fec.split('-');
 

    let cumpleanos =  new Date(forFecha[0],forFecha[1]-1,forFecha[2]).toLocaleString();
    let fechaCumple = cumpleanos.split(' ')
    console.log();
    let data = {
       tipoDocumento : tD,
       numeroDocuemto: nDo,
       tipoUsuario: ar,
       nombreCompletp: noCo,
       primerApellido: priApe,
       segundoApellido: seApe,
       fechaNacimineto: fechaCumple[0]
    }
    console.log(data);

    axios.post('http://localhost:5000/createUsuario', data)
        .then(function(res) {
          if(res.status==200) {
          
            Swal.fire({
                icon: 'success',
                title: 'Nuevo Usuario Creado correctamente',
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


function cargarTipoUsuarios(){
    axios.get('http://localhost:5000/tipoUsuarios')
    .then(function(res) {
        
  
            var select = document.getElementById('area');
           console.log(res.data);
            for(var i=0; i < res.data.length; i++){ 
                var option = document.createElement("option"); 
                option.value = res.data[i].TIPO_USUARIO_ID;
                option.innerHTML = res.data[i].AREA;
                select.appendChild(option);
            }
           

    })
    .catch(function(err) {
      console.log(err)
    })
}


function cargarTipoDocumentos(){
    axios.get('http://localhost:5000/tipoDocumentos')
    .then(function(res) {
        
  
            var select = document.getElementById('tipD');
           console.log(res.data);
            for(var i=0; i < res.data.length; i++){ 
                var option = document.createElement("option"); 
                option.value = res.data[i].TIPO_DOCUMENTO_ID;
                option.innerHTML = res.data[i].TIPO_DOCUMENTO;
                select.appendChild(option);
            }
           

    })
    .catch(function(err) {
      console.log(err)
    })
}


function cargarUsuarios(){
    axios.get('http://localhost:5000/usuarios')
    .then(function(res) {
        
  
        let s = document.getElementById('list');
      
        for (var i = 0; i < res.data.length; i++) {
              var hilera = document.createElement("li");
              var celda = document.createElement("div");
              var button = document.createElement("button");
              button.setAttribute('id', res.data[i].DOCUMENTO);
              button.setAttribute('class', 'btn btn-danger float-right');
              button.setAttribute('onclick', 'eliminarRegistro(this)');
              var textoButtom = document.createTextNode('Eliminar');
              hilera.classList.add('list-group-item');
           
         
              var textoCelda = document.createTextNode(`${res.data[i].DOCUMENTO} ` + ` ${res.data[i].NOMBRE_COMPLETO}` + ` ${res.data[i].PRIMER_APELLIDO}`);
              
              celda.appendChild(textoCelda);
              celda.appendChild(button);
              button.appendChild(textoButtom);
              hilera.appendChild(celda);
              s.appendChild(hilera);
          }
           

    })
    .catch(function(err) {
      console.log(err)
    })
}


function validarUsuario(){
  let nDo = Number(numeDo.value);
  const data = {documento:nDo}
  axios.post('http://localhost:5000/consultarUserExiste', data)
  .then(function(res) {
  
     if(res.status === 200){
       if(res.data[0].USUARIO === 0){
        crearUsuario();
       }else{
        Swal.fire({
          icon: 'warning',
          title: 'Usuario ya existe, por favor valida el documento',
          showConfirmButton: false,
          timer: 4000
        })
       }
     }
      
  })
  .catch(function(err) {
    console.log(err)
  })
}


function eliminarRegistro(e){
    console.log(e.id);
    let data =  {
        documento: e.id
      }

    axios.post('http://localhost:5000/deleteUsuarios', data)
    .then(function(res) {
        if(res.status==200) {
          
            Swal.fire({
                icon: 'success',
                title: 'Usuario Eliminado correctamente',
                showConfirmButton: false,
                timer: 2000
            }).then(recargar());
          }
       console.log(res);
        
    })
    .catch(function(err) {
      console.log(err)
    })

}

function recargar(){

    var div = document.getElementById('list');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    
    cargarUsuarios();
}



function limpiar (){
    tipD.value= '';
    numeDo.value= '';
    area.value= '';
    nombreCo.value= '';
    primerApe.value= '';
    segundoApe.value= '';
    fecha.value= '';

    recargar();
}


function solicitudes(){
    location.href = "file:///C:/Users/Juan/Desktop/Aplicación%20bd2/Front%20BD2/htmls/solicitudes.html";
}

document.onload = cargarUsuarios() ;
document.onload = cargarTipoDocumentos() ;
document.onload = cargarTipoUsuarios() ;