
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
// Levenshtein distance function
function levenshteinDistance(a, b) {
    const an = a.length;
    const bn = b.length;
    if (an === 0) return bn;
    if (bn === 0) return an;
    const matrix = Array.from({ length: bn + 1 }, (_, i) => [i]);
    for (let j = 1; j <= an; j++) matrix[0][j] = j;
    for (let i = 1; i <= bn; i++) {
        for (let j = 1; j <= an; j++) {
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1) // substitution
            );
        }
    }
    return matrix[bn][an];
}

// Add event listener for search form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    let query = document.getElementById('search-input').value.toLowerCase(); // Get the search query
    let items = document.querySelectorAll('.product-item'); // Get all product items
    
    let resultsFound = false; // Variable to track if any results are found
    const maxDistance = 2; // Maximum Levenshtein distance for fuzzy matching
    
    // Loop through the product items and hide those that don't match the query
    items.forEach(function(item) {
        let text = item.innerText.toLowerCase();
        let words = text.split(/\s+/); // Split item text into words
        let match = words.some(word => {
            return word.includes(query) || levenshteinDistance(word, query) <= maxDistance;
        });
        
        if (match) {
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

// Add event listener for input field to show suggestions
document.getElementById('search-input').addEventListener('input', function() {
    let query = this.value.toLowerCase(); // Get the search query
    let items = document.querySelectorAll('.product-item'); // Get all product items
    let suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    
    let suggestions = [];
    const maxDistance = 2; // Maximum Levenshtein distance for fuzzy matching
    
    items.forEach(function(item) {
        let text = item.innerText.toLowerCase();
        let words = text.split(/\s+/); // Split item text into words
        words.forEach(function(word) {
            if (word.includes(query) || levenshteinDistance(word, query) <= maxDistance) {
                if (!suggestions.includes(word)) {
                    suggestions.push(word);
                }
            }
        });
    });
    
    suggestions.slice(0, 5).forEach(function(suggestion) { // Display only top 5 suggestions
        let suggestionItem = document.createElement('div');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', function() {
            document.getElementById('search-input').value = suggestion;
            suggestionsBox.innerHTML = '';
        });
        suggestionsBox.appendChild(suggestionItem);
    });
});
document.addEventListener('click', function(event) {
    let searchInput = document.getElementById('search-input');
    let suggestionsBox = document.getElementById('suggestions');
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.innerHTML = '';
    }
});