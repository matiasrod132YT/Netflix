"use strict";

import { imageBaseURL, api_key } from "./api.js";
import { movies } from './movies.js'; // Importa el array de películas

let currentIndex = 0; // Índice inicial

// movie card
export async function createMovieCard() {
  // Verifica si el índice está dentro del rango del array
  if (currentIndex >= movies.length) {
    currentIndex = 0; // Reinicia el índice si llegamos al final de la lista
  }

  const movie = movies[currentIndex];
  const movieTitle = encodeURIComponent(movie.title); // Codifica el título para usar en la URL

  // Realiza una búsqueda de película usando el título
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieTitle}`);
  const data = await response.json();
  const firstResult = data.results[0]; // Usa el primer resultado

  const posterUrl = firstResult ? `${imageBaseURL}w500${firstResult.poster_path}` : 'assets/images/default-image.jpg';
  
  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img src="${posterUrl}" alt="${movie.title}" class="img-cover" loading="lazy">
    </figure>
    
    <h4 class="title">${movie.title}</h4>
    
    <a href="./detalles.html" class="card-btn" title="${movie.title}"></a>
  `;

  currentIndex++; // Incrementa el índice para la siguiente llamada

  return card;
}
  