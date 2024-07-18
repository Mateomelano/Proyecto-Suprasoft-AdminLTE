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
    let indDestinos = d.getElementById("indDestinos");
    let indPaquetes = d.getElementById("indPaquetes");
    let indReservas = d.getElementById("indReservas");
    let indPaqueteMasReservado = d.getElementById("indPaqueteMasReservado");
    let indUsuarioMasReservas = d.getElementById("indUsuarioMasReservas");

    // CANTIDAD DE USUARIOS
    res = await usuariosServices.listar();
    indUsuarios.innerHTML = res.length;
    
    // CANTIDAD DE DESTINOS
    res = await destinosServices.listar();
    indDestinos.innerHTML = res.length;

    // CANTIDAD DE PAQUETES
    res = await paquetesServices.listar();
    indPaquetes.innerHTML = res.length;

    // CANTIDAD DE RESERVAS
    res = await reservaServices.listar();
    indReservas.innerHTML = res.length;

    // PAQUETE MÁS RESERVADO
    const reservas = await reservaServices.listar();
    const paquetesReservas = {};

    reservas.forEach(reserva => {
        const paqueteId = reserva.paquete_id;
        if (paquetesReservas[paqueteId]) {
            paquetesReservas[paqueteId]++;
        } else {
            paquetesReservas[paqueteId] = 1;
        }
    });

    const paqueteMasReservadoId = Object.keys(paquetesReservas).reduce((a, b) => paquetesReservas[a] > paquetesReservas[b] ? a : b, null);
    if (paqueteMasReservadoId) {
        const paqueteMasReservado = await paquetesServices.listar(paqueteMasReservadoId);
        indPaqueteMasReservado.innerHTML = `${paqueteMasReservado.nombre} (${paquetesReservas[paqueteMasReservadoId]} reservas)`;
    } else {
        indPaqueteMasReservado.innerHTML = "No hay reservas";
    }

    // USUARIO CON MÁS RESERVAS
    const usuariosReservas = {};

    reservas.forEach(reserva => {
        const usuarioId = reserva.usuario_id;
        if (usuariosReservas[usuarioId]) {
            usuariosReservas[usuarioId]++;
        } else {
            usuariosReservas[usuarioId] = 1;
        }
    });

    const usuarioMasReservasId = Object.keys(usuariosReservas).reduce((a, b) => usuariosReservas[a] > usuariosReservas[b] ? a : b, null);
    if (usuarioMasReservasId) {
        const usuarioMasReservas = await usuariosServices.listar(usuarioMasReservasId);
        indUsuarioMasReservas.innerHTML = `${usuarioMasReservas.nombre} (${usuariosReservas[usuarioMasReservasId]} reservas)`;
    } else {
        indUsuarioMasReservas.innerHTML = "No hay reservas";
    }
}