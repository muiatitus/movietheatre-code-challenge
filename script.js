// Define API endpoints
const filmEndpoint = "http://localhost:3000/films";
const filmDetailsEndpoint = "http://localhost:3000/films/1";
const filmsList = document.getElementById("films");

// Define DOM elements
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const availableTickets = document.getElementById("available-tickets");
const buyTicketButton = document.getElementById("buy-ticket");

// Fetch film details for 'The Giant Gila Monster' and populate movie details section
fetch(filmDetailsEndpoint)
  .then((response) => response.json())
  .then((data) => {
    displayMovieDetails(data);
  });

// Fetch all films and populate films list
fetch(filmEndpoint)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((film) => {
      const li = document.createElement("li");
      li.textContent = film.title;
      li.classList.add("film", "item");
      li.addEventListener("click", () => {
        displayMovieDetails(film);
      });
      filmsList.appendChild(li);
    });
  });

// Display movie details
function displayMovieDetails(film) {
  poster.src = film.poster;
  title.textContent = film.title;
  runtime.textContent = `Runtime: ${film.runtime} minutes`;
  showtime.textContent = `Showtime: ${film.showtime}`;
  availableTickets.textContent = `Available Tickets: ${
    film.capacity - film.tickets_sold
  }`;

  if (film.tickets_sold === film.capacity) {
    buyTicketButton.disabled = true;
    buyTicketButton.textContent = "Sold Out";
  } else {
    buyTicketButton.disabled = false;
    buyTicketButton.textContent = "Buy Ticket";
  }

  buyTicketButton.addEventListener("click", () => {
    if (film.tickets_sold < film.capacity) {
      film.tickets_sold++;
      availableTickets.textContent = `Available Tickets: ${
        film.capacity - film.tickets_sold
      }`;
      updateTicketsSold(film.id, film.tickets_sold);
    }
  });
}

// Update tickets_sold on the server
function updateTicketsSold(filmId, ticketsSold) {
  fetch(`${filmEndpoint}/${filmId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tickets_sold: ticketsSold,
    }),
  })
    .then((response) => response.json())
    .then((updatedFilm) => {
      availableTickets.textContent = `Available Tickets: ${
        updatedFilm.capacity - updatedFilm.tickets_sold
      }`;
      if (updatedFilm.tickets_sold === updatedFilm.capacity) {
        buyTicketButton.disabled = true;
        buyTicketButton.textContent = "Sold Out";
      }
    });
}

// Delete a film from the server
function deleteFilm(filmId) {
  fetch(`${filmEndpoint}/${filmId}`, {
    method: "DELETE",
  })
    .then(() => {
      const filmItem = filmsList.querySelector(`li[data-id="${filmId}"]`);
      if (filmItem) {
        filmItem.remove();
      }
    });
}
