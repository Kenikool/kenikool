//initial value

const API_KEY = 'c1aec430c496be1ecf6cfc58a9fd8fd5';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=c1aec430c496be1ecf6cfc58a9fd8fd5';

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

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url, renderSearchMovies,  handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    
    const render = renderMovies.bind({title: 'Upcoming Movies'})
    requestMovies(url, render,  handleError);
}

function getTopRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Top Rated Movies'})

    requestMovies(url, render,  handleError);
}

function getPopularmovies() {
    const path = '/movie/popular';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Popular Movies'})

    requestMovies(url, render,  handleError);
}










//initial value

/*const API_KEY = 'c1aec430c496be1ecf6cfc58a9fd8fd5';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=c1aec430c496be1ecf6cfc58a9fd8fd5';

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

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url, renderSearchMovies,  handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    
    requestMovies(url, renderMovies,  handleError);
}

function getTopRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    
    requestMovies(url, renderMovies,  handleError);
}

function getPopularmovies() {
    const path = '/movie/popular';
    const url = generateUrl(path);
    
    requestMovies(url, renderMovies,  handleError);
}*/
