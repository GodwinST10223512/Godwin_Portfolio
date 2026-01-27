// 1. Select the elements we want to interact with
const button = document.getElementById('colorBtn');
const heroSection = document.querySelector('.hero');

// 2. Define the colors we want to cycle through
const colors = ['#2c3e50', '#e74c3c', '#27ae60', '#8e44ad'];
let colorIndex = 0;

// 3. Add the Event Listener (The "Ear")
button.addEventListener('click', function() {
    // Increment the index
    colorIndex++;
    
    // If we reach the end of the list, go back to 0
    if (colorIndex >= colors.length) {
        colorIndex = 0;
    }

    // Change the background color using CSS through JS
    heroSection.style.backgroundColor = colors[colorIndex];
    
    // Log to console so we can see it working behind the scenes
    console.log("Current Color:", colors[colorIndex]);
});