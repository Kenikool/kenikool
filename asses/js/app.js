
//selecting element from the DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container');




function movieSection(movies) {
    const section = document.createElement('section');
    section.classList = 'section';
     movies.map((movie) => {
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src=IMAGE_URL + movie.poster_path
            img.setAttribute('data-movie-id', movie.id)
            
            section.appendChild(img);
        }
      })

      return section
}

function createMovieContainer(movies, title='') {
    const movieElement  = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = document.createElement('h2');
    header.classList = 'content';

    const content = document.createElement('div');
        content.classList = 'content';

    const contentClose = `<p id="content-close"X</p>`; 

    content.innerHTML = contentClose;

    const section = movieSection(movies);


    const  movieTemplate  = `
        <h2>${title}</h2>
        <section class="section">
            ${movieSection(movies)}
        </section>
         <div class="content">
             <p id="content-close">X</p>
         </div>

    `;

    //movieElement.innerHTML = movieTemplate;
    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    return movieElement;
}

function renderSearchMovies(data) {
   
        //data.result []
        movieSearchable.innerHTML ='';
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        movieSearchable.appendChild(movieBlock);
        //console.log('Data: ', data);

}
function renderMovies(data) {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
    //console.log('Data: ', data);
 
}



function handleError(error) {
    console.log('Error: ', error)
}


buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);

    inputElement.value = '';
    console.log('Value: ', value)
}

function createIframe(video){
    const iframe = document.createElement('iframe')
    iframe.src=`https://www.youtube.com/embed/${video.key}`
    iframe.width = 360
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data,  content) {
     
    //todo
         //display movie videos
        content.innerHTML = '<p  id="content-close">X</p>';       
        console.log('Videos: ', data);
        const  videos = data.results;
        const length = videos.length > 4 ?  4 : videos.length;
        const  iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i]; //video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}
    


//event delegation
document.onclick = function(event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
       // console.log('hello  world');
        //console.log('Event: ', event);
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement; //section
        const  content = section.nextElementSibling; //content
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url  = generateUrl(path);
        // fetch  movie  videos
        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate (data,  content))
        .catch((error) => {
        console.log('Error: ', error)
            
    });
    }

   
    if (target.id === 'content-close') {
        const content =  target.parentElement;
        content.classList.remove('content-display')
    }
}




getUpcomingMovies();
getTopRatedMovies();
getPopularmovies();
searchMovie();














/*selecting element from the DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container');




function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img src= ${IMAGE_URL + movie.poster_path} 
            data-movie-id=${movie.id}
            /> `;  
        }
      })
}

function createMovieContainer(movies) {
    const movieElement  = document.createElement('div');
    movieElement.setAttribute('class', 'movie');


    const  movieTemplate  = `
        <section class="section">
            ${movieSection(movies)}
        </section>
         <div class="content">
             <p id="content-close">X</p>
         </div>

    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
   
        //data.result []
        movieSearchable.innerHTML ='';
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        movieSearchable.appendChild(movieBlock);
        //console.log('Data: ', data);

}
function renderMovies(data) {
    //data.result []
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesContainer.appendChild(movieBlock);
    //console.log('Data: ', data);
 
}



function handleError(error) {
    console.log('Error: ', error)
}


buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);

    inputElement.value = '';
    console.log('Value: ', value)
}

function createIframe(video){
    const iframe = document.createElement('iframe')
    iframe.src=`https://www.youtube.com/embed/${video.key}`
    iframe.width = 360
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data,  content) {
     
    //todo
         //display movie videos
        content.innerHTML = '<p  id="content-close">X</p>';       
        console.log('Videos: ', data);
        const  videos = data.results;
        const length = videos.length > 4 ?  4 : videos.length;
        const  iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i]; //video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}
    


//event delegation
/*document.onclick = function(event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
       // console.log('hello  world');
        //console.log('Event: ', event);
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement; //section
        const  content = section.nextElementSibling; //content
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url  = generateUrl(path);
        // fetch  movie  videos
        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate (data,  content))
        .catch((error) => {
        console.log('Error: ', error)
            
    });
    }

   
    if (target.id === 'content-close') {
        const content =  target.parentElement;
        content.classList.remove('content-display')
    }
}




getUpcomingMovies();
getTopRatedMovies();
getPopularmovies();





/*initial value

const API_KEY = 'c1aec430c496be1ecf6cfc58a9fd8fd5';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=c1aec430c496be1ecf6cfc58a9fd8fd5';

//selecting element from the DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');


function generateUrl(path)  {
    const url = `https://api.themoviedb.org/3${path}?api_key=c1aec430c496be1ecf6cfc58a9fd8fd5`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);

}

function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img src= ${IMAGE_URL + movie.poster_path} 
            data-movie-id=${movie.id}
            /> `;  
        }
      })
}

function createMovieContainer(movies) {
    const movieElement  = document.createElement('div');
    movieElement.setAttribute('class', 'movie');


    const  movieTemplate  = `
        <section class="section">
            ${movieSection(movies)}
        </section>
         <div class="content">
             <p id="content-close">X</p>
         </div>

    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
   
        //data.result []
        movieSearchable.innerHTML ='';
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        movieSearchable.appendChild(movieBlock);
        console.log('Data: ', data);

}

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url, renderSearchMovies,  handleError);
}

function handleError(error) {
    console.log('Error: ', error)
}


buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);

    inputElement.value = '';
    console.log('Value: ', value)
}

function createIframe(video){
    const iframe = document.createElement('iframe')
    iframe.src=`https://www.youtube.com/embed/${video.key}`
    iframe.width = 360
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data,  content) {
     
    //todo
         //display movie videos
        content.innerHTML = '<p  id="content-close">X</p>';       
        console.log('Videos: ', data);
        const  videos = data.results;
        const length = videos.length > 4 ?  4 : videos.length;
        const  iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i]; //video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}
    


//event delegation
document.onclick = function(event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
       // console.log('hello  world');
        //console.log('Event: ', event);
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement; //section
        const  content = section.nextElementSibling; //content
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url  = generateUrl(path);
        // fetch  movie  videos
        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate (data,  content))
        .catch((error) => {
        console.log('Error: ', error)
            
    });
    }

   
    if (target.id === 'content-close') {
        const content =  target.parentElement;
        content.classList.remove('content-display')
    }
}*/
