let area = document.getElementById('area');
let idA = document.getElementById('idA');

function limpiar (){
    area.value = "";
    idA.value = "";
    let s = document.getElementById('list');
    s.removeChild(child);
    cargarTipoUsuarios();
}


function crearTipoUsuario(){
    let areaTipo = area.value;
    let idArea = Number(idA.value);
    let data = {
       TIPOS_USUARIOS_ID : idArea,
       AREA: areaTipo 
    }
    axios.post('http://localhost:5000/createTipoUsuario', data)
        .then(function(res) {
          if(res.status==200) {
          
            Swal.fire({
                icon: 'success',
                title: 'Nuevo Tipo de Usuario Creado correctamente',
                showConfirmButton: false,
                timer: 1500
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
        let s = document.getElementById('list');

        for (var i = 0; i < res.data.length; i++) {
                var hilera = document.createElement("li");
                var celda = document.createElement("div");
              hilera.classList.add('list-group-item');
              var textoCelda = document.createTextNode(`${res.data[i].AREA}`);
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
            s.appendChild(hilera);
          }
    })
    .catch(function(err) {
      console.log(err)
    })

}

function usuarios(){
    location.href = "file:///C:/Users/Juan/Desktop/Aplicación%20bd2/Front%20BD2/htmls/usuarios.html";
}

document.onload = cargarTipoUsuarios() ;


