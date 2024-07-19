import { usuariosServices } from "../../servicios/usuarios-servicios.js";


const htmlHome = 
` <div class="row" >
    <!-- ./col -->
    
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box">
            <div class="inner">
            <h3 id="indUsuarios">44</h3>

            <p>Usuarios Registrados</p>
            </div>
            <div class="icon">
            <i class="ion ion-person-add"></i>
            </div>
            <a href="#/usuarios" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
</div>`


export async function Home(){
    let d = document;
    let res = '';
    d.querySelector('.contenidoTitulo').innerHTML = 'Home';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Home";
    d.querySelector('.rutaMenu').setAttribute('href',"#/home");
    let cP = d.getElementById('contenidoPrincipal');
           
    cP.innerHTML = htmlHome;
    let indUsuarios = d.getElementById("indUsuarios");

    // CANTIDAD DE USUARIOS
    res = await usuariosServices.listar();
    indUsuarios.innerHTML = res.length;
    
}