
// JavaScript to handle the small header interactivity
const smallHeader = document.querySelector('.small-header');
const headerOptions = document.querySelector('.small-header ul');

function showHeaderOptions() {
    headerOptions.style.display = 'flex';
}

function hideHeaderOptions() {
    headerOptions.style.display = 'none';
}

// search functionality
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    let query = document.getElementById('search-input').value.toLowerCase(); // Get the search query
    let items = document.querySelectorAll('.product-item'); // Get all product items
    
    let resultsFound = false; // Variable to track if any results are found
    
    // Loop through the product items and hide those that don't match the query
    items.forEach(function(item) {
        let text = item.innerText.toLowerCase();
        if (text.includes(query)) {
            item.classList.remove('hidden');
            resultsFound = true;
        } else {
            item.classList.add('hidden');
        }
    });
    
    if (!resultsFound) {
        // Show a message if no results are found
        alert('No products found matching your search criteria.');
    }
});

//Caurosal

let currentIndex = 0;

const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const carousel = document.querySelector('.carousel');
    const slideWidth = slides[0].clientWidth;
    carousel.style.transform = `translateX(-${index * slideWidth}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

window.addEventListener('resize', () => {
    showSlide(currentIndex);
});

setInterval(nextSlide, 5000); // Change slide every 5 seconds

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex); // Ensure the first slide is shown on load
});

