document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded successfully.");

    // ==========================================
    // 1. SEARCH & FILTER LOGIC (Products Page)
    // ==========================================
    const searchInput = document.getElementById('productSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Only run if we are on the products page
    if (searchInput && filterBtns.length > 0) {
        
        function filterProducts() {
            const term = searchInput.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

            productCards.forEach(card => {
                // Get text inside the card for search
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                // Get the data-category attribute for filtering
                const category = card.getAttribute('data-category');

                const matchesSearch = title.includes(term) || desc.includes(term);
                const matchesFilter = activeFilter === 'all' || category === activeFilter;

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block'; // Show it
                } else {
                    card.style.display = 'none'; // Hide it
                }
            });
        }

        // Listen for typing in the search bar
        searchInput.addEventListener('input', filterProducts);

        // Listen for clicks on filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 1. Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // 2. Add active class to the clicked button
                e.target.classList.add('active');
                // 3. Run the filter
                filterProducts();
            });
        });
    }

    // ==========================================
    // 2. AJAX ENQUIRY FORM SIMULATION (Enquiry Page)
    // ==========================================
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const service = document.getElementById('service').value;
            const btn = this.querySelector('button');
            const responseBox = document.getElementById('enquiryResponse');

            btn.textContent = "Processing...";
            btn.disabled = true;

            setTimeout(() => { 
                let cost = "Varies", avail = "Contact us";
                if (service === 'repair') { cost = "R500 - R1500"; avail = "Next 2 business days"; }
                if (service === 'custom-build') { cost = "R5000+"; avail = "3-5 business days"; }

                enquiryForm.style.display = 'none';
                responseBox.style.display = 'block';
                responseBox.innerHTML = `
                    <h3>Enquiry Processed</h3>
                    <p><strong>Estimated Cost:</strong> ${cost}</p>
                    <p><strong>Availability:</strong> ${avail}</p>
                    <p>We will be in touch shortly!</p>
                `;
                responseBox.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }

    // ==========================================
    // 3. AJAX CONTACT FORM SIMULATION (Contact Page)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            const btn = this.querySelector('button');
            const responseBox = document.getElementById('contactResponse');

            btn.textContent = "Sending...";
            btn.disabled = true;

            setTimeout(() => {
                const mailto = `mailto:jingotech@gmail.com?subject=Contact from ${name}&body=${message}%0D%0AFrom: ${email}`;
                window.location.href = mailto;

                contactForm.style.display = 'none';
                responseBox.style.display = 'block';
                responseBox.innerHTML = `
                    <h3>Thank you, ${name}!</h3>
                    <p>Your message is ready. Your email app should open shortly.</p>
                `;
                responseBox.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }
    
    // ==========================================
    // 4. GALLERY LIGHTBOX
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    // Target all images inside the product cards
    const triggers = document.querySelectorAll('.product-card img');

    if (lightbox && triggers.length > 0) {
        triggers.forEach(img => {
            // Make it look clickable
            img.style.cursor = 'pointer'; 
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src; // Use the same image source
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Close if user clicks outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

});