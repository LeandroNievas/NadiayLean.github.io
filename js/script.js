    // Mostrar el botón cuando el usuario baja 300px
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let boton = document.getElementById("botonArriba");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        boton.style.display = "block";
    } else {
        boton.style.display = "none";
    }
}

// Función para subir suavemente
function volverArriba() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



// 1. Configura la fecha y hora de tu evento (Año, Mes (0-11), Día, Hora, Minuto)
        const fechaEvento = new Date('09/19/2026 08:00 PM');

        const actualizarContador = setInterval(() => {
            const ahora = new Date().getTime();
            const distancia = fechaEvento - ahora;

            // Cálculos para días, horas, minutos y segundos
            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            // Actualizar los elementos HTML
            document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
            document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
            document.getElementById("minutos").innerText = minutos < 10 ? '0' + minutos : minutos;
            document.getElementById("segundos").innerText = segundos < 10 ? '0' + segundos : segundos;
        }, 1000);

        const audio = document.getElementById('audio-fondo');
        const boton = document.getElementById('btn-musica');
        const icono = document.getElementById('icono-audio');
        const controlVolumen = document.getElementById('control-volumen');

        // Configurar volumen inicial al cargar el elemento gráfico
        audio.volume = controlVolumen.value;

        // Función para actualizar el icono según el estado
        function actualizarIcono() {
            if (audio.paused) {
                icono.className = "fa-solid fa-volume-xmark"; 
                boton.style.backgroundColor = "#9e9e9e"; 
            } else {
                icono.className = "fa-solid fa-volume-high"; 
                boton.style.backgroundColor = "#ff5722"; 
            }
        }

        // Función para prender o apagar la música
        function controlarMusica() {
            if (audio.paused) {
                audio.play().catch(function(error) {
                    console.log("El navegador requiere interacción previa del usuario.");
                });
            } else {
                audio.pause();
            }
            actualizarIcono();
        }

        // Función para ajustar el volumen en tiempo real
        function ajustarVolumen(valor) {
            audio.volume = valor;
            
            // Si el usuario baja todo el volumen, pausamos visualmente o mutemos
            if (valor == 0) {
                icono.className = "fa-solid fa-volume-xmark";
            } else if (!audio.paused) {
                icono.className = "fa-solid fa-volume-high";
            }
        }

        // Intento de reproducción automática al cargar la página
        window.onload = function() {
            audio.play().then(function() {
                actualizarIcono();
            }).catch(function(error) {
                console.log("Autoplay bloqueado. Haz clic en el botón para escuchar.");
                actualizarIcono(); 
            });
        };

        const modal = document.getElementById('miModal');
        const btnAbrir = document.getElementById('btnAbrir');
        const btnCerrar = document.getElementById('btnCerrar');

        // Abrir y cerrar el modal
        btnAbrir.addEventListener('click', () => modal.showModal());
        btnCerrar.addEventListener('click', () => modal.close());

        // Cerrar al hacer clic en el fondo oscuro (fuera de la caja)
        modal.addEventListener('click', (e) => {
            const dimensiones = modal.getBoundingClientRect();
            if (
                e.clientX < dimensiones.left ||
                e.clientX > dimensiones.right ||
                e.clientY < dimensiones.top ||
                e.clientY > dimensiones.bottom
            ) {
                modal.close();
            }
        });

        // Copiar texto y cambiar dinámicamente las clases de Bootstrap
        function copiarTexto(idElemento, boton) {
            const texto = document.getElementById(idElemento).innerText;
            
            navigator.clipboard.writeText(texto).then(() => {
                // Guardamos el texto original
                const textoOriginal = boton.innerText;
                
                // Cambiamos a éxito (Verde) usando clases de Bootstrap
                boton.innerText = "¡Copiado!";
                boton.classList.remove('btn-outline-primary');
                boton.classList.add('btn-success');
                
                // Volvemos al diseño original después de 2 segundos
                setTimeout(() => {
                    boton.innerText = textoOriginal;
                    boton.classList.remove('btn-success');
                    boton.classList.add('btn-outline-primary');
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
        }