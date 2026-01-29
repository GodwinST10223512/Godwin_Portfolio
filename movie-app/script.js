// 1. SELECT ELEMENTS
const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");


const key = "2b88ac6d"; 

// 3. FUNCTION TO FETCH DATA FROM API
let getMovie = () => {
    let movieName = movieNameRef.value;
    
    // Construct the URL: "Base URL + Name + Key"
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // If input is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name 🎬</h3>`;
    }

    // If input is valid, FETCH the data
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // Check if movie exists in database
            if (data.Response == "True") {
                
                // 4. DISPLAY THE DATA (The "View")
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <span>⭐ ${data.imdbRating}</span>
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            } 
            
            // If movie doesn't exist
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        // If error occurs (e.g., no internet)
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
    }
};

// 5. ADD EVENT LISTENERS
searchBtn.addEventListener("click", getMovie);

// Allow pressing "Enter" key to search
movieNameRef.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getMovie();
    }
});

// Run once on load so it's not empty
window.addEventListener("load", getMovie);