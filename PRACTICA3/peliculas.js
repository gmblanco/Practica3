let pagina = 1;
let contenido = "top_rated"; //contenido predeterminado

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const searchInput = document.querySelector("[data-search]")

const btnTopRated = document.querySelector("[top-rated]")
const btnPopular = document.querySelector("[popular]")
const btnUpcoming = document.querySelector("[upcoming]")
const btnNowPlaying = document.querySelector("[now-playing]")

let films = [];//aqui voy a guardar todos los titulos de mis peliculas para la busqueda

btnSiguiente.addEventListener('click', ()=>{
    if(pagina < 1000){
        pagina +=1;
    cargarPeliculas();//cargo las peliculas de la siguiente pagina
    }
})
btnAnterior.addEventListener('click', ()=>{
    if(pagina > 1){
        pagina -=1;
    cargarPeliculas();//cargo las peliculas de la siguiente pagina
    }
})
btnTopRated.addEventListener('click', ()=>{
    contenido = "top_rated";
    pagina = 1;
    cargarPeliculas(); 
})
btnPopular.addEventListener('click', ()=>{
    contenido = "popular"; 
    pagina = 1;
    cargarPeliculas(); 
})
btnNowPlaying.addEventListener('click', ()=>{
    contenido = "now_playing";
    pagina = 1;
    cargarPeliculas(); 
})
btnUpcoming.addEventListener('click', ()=>{
    contenido = "upcoming"; 
    pagina = 1;
    cargarPeliculas(); 
})

//Barra de busqueda
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    films.forEach(film => {
        const isVisible = film.title.toLowerCase().includes(value);
        film.element.classList.toggle("hide", !isVisible);
    });
});


const userCardTemplate = document.querySelector("[data-film-template]");
const contenedorPeliculas = document.getElementById('container');
const cargarPeliculas = async() =>{
    try{
        contenedorPeliculas.innerHTML = ''; // Limpiar contenido existente
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${contenido}?api_key=d5174ed2687bd845db04a0e25ebbcbb7&language=es-ES&page=${pagina}`);
        //comprobamos el status de la peticion, es decir, si la respuesta es correcta (status=200)
        if(respuesta.status === 200){
            const datos = await respuesta.json(); //json tmb es asincrono
            //por cada pelicula quiero acceder a sus datos
            datos.results.forEach(pelicula =>{
                const card = userCardTemplate.content.cloneNode(true).children[0];
                const titulo = card.querySelector(".titulo");
                const body = card.querySelector(".poster");
                titulo.textContent = pelicula.title;
                body.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
                
                //metemos en el array los titulos de las peliculas (actualizadas)
                films.push({
                    title: pelicula.title,
                    element: card
                });
                contenedorPeliculas.append(card);
            })
            
        }else if(respuesta.status === 401){
            console.log("ERROR! La peticion no ha sido ejecutada porque parece que carece de credenciales válidas de autenticación, REVISA LE KEY");
        }else if(respuesta.status === 404){
            console.log("ERROR! La película que busca no existe");
        }else{
            console.log("Hubo un error");
        }
        
    }catch(error){
        console.log(error);
    }
    
}

cargarPeliculas();