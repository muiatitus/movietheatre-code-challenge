// Define API endpoints
const filmEndpoint = "http://localhost:3000/films";
const filmDetailsEndpoint = "http://localhost:3000/films/1";

// Define DOM elements
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const availableTickets = document.getElementById("available-tickets");
const filmsList = document.getElementById("films");

// Fetch film details and populate movie details section
fetch(filmDetailsEndpoint)
  .then((response) => response.json())
  .then((data) => {
    poster.src = data.poster;
    title.textContent = data.title;
    runtime.textContent = `Runtime: ${data.runtime} minutes`;
    showtime.textContent = `Showtime: ${data.showtime}`;
    availableTickets.textContent = `Available Tickets: ${
      data.capacity - data.tickets_sold
    }`;
  });

// Fetch all films and populate films list
fetch(filmEndpoint)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((film) => {
      const li = document.createElement("li");
      li.textContent = film.title;
      li.classList.add("film", "item");
      filmsList.appendChild(li);
    });
  });