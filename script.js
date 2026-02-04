// Toggle Navigation Links for Mobile
document.getElementById('hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});


// Sticky Secondary Navbar on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const secondaryNav = document.querySelector(".secondary-nav");
    const primaryNavHeight = document.querySelector(".primary-nav") ? document.querySelector(".primary-nav").offsetHeight : 0;

    window.addEventListener("scroll", function () {
        if (window.scrollY > primaryNavHeight) {
            secondaryNav.style.position = "fixed";
            secondaryNav.style.top = "0";
            secondaryNav.style.width = "100%";
            secondaryNav.style.zIndex = "1000";
            secondaryNav.style.backgroundColor = "#2E8B57"; // Ensures visibility
        } else {
            secondaryNav.style.position = "relative";
        }
    });
});

// Search Functionality
document.querySelector('.search-box').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents page refresh
    const searchValue = document.getElementById('searchInput').value.trim();
    
    if (searchValue === "") {
        alert("Please enter something to search.");
    } else {
        alert(`Searching for: ${searchValue}`);
        // Optionally redirect or perform search logic
    }
});


