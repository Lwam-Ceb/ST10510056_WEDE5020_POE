document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded successfully.");

    // ==========================================
    // 1. SEARCH & FILTER LOGIC (Products Page)
    // ==========================================
    const searchInput = document.getElementById('productSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput && filterBtns.length > 0) {
        function filterProducts() {
            const term = searchInput.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                const category = card.getAttribute('data-category');

                const matchesSearch = title.includes(term) || desc.includes(term);
                const matchesFilter = activeFilter === 'all' || category === activeFilter;

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        searchInput.addEventListener('input', filterProducts);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                filterProducts();
            });
        });
        const sortSelect = document.getElementById('productSort');
        const productGrid = document.getElementById('product-grid-container');
        
        // Save the original order of the cards so we can reset it
        const originalCards = Array.from(productCards);

        if (sortSelect && productGrid) {
            sortSelect.addEventListener('change', function() {
                const cardsArray = Array.from(productCards);
                
                if (this.value === 'price-low' || this.value === 'price-high') {
                    cardsArray.sort((a, b) => {
                        // Extract the numbers from the price span (e.g., "R 15,999" becomes 15999)
                        const priceA = parseFloat(a.querySelector('.price').innerText.replace(/[^0-9.]/g, ''));
                        const priceB = parseFloat(b.querySelector('.price').innerText.replace(/[^0-9.]/g, ''));
                        
                        if (this.value === 'price-low') return priceA - priceB;
                        if (this.value === 'price-high') return priceB - priceA;
                    });
                    
                    // Clear the grid and append the sorted cards
                    productGrid.innerHTML = '';
                    cardsArray.forEach(card => productGrid.appendChild(card));
                    
                } else {
                    // If "Default" is selected, restore the original order
                    productGrid.innerHTML = '';
                    originalCards.forEach(card => productGrid.appendChild(card));
                }
            });
        }
    }

    // ==========================================
    // 2. ENQUIRY FORM (EmailJS Integration)
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

            // Calculate cost and availability
            let cost = "Varies", avail = "Contact us";
            if (service === 'repair') { cost = "R500 - R1500"; avail = "Next 2 business days"; }
            if (service === 'custom-build') { cost = "R5000+"; avail = "3-5 business days"; }
            if (service === 'upgrade') { cost = "From R1500"; avail = "Next business day"; }
            if (service === 'maintenance') { cost = "R300"; avail = "Next 2 business days"; }

            const serviceID = 'service_q5r8kmb';
            const templateID = 'template_657jati'; // ENQUIRY TEMPLATE ID

            // Pass the calculated cost and availability along with the form data
            const templateParams = {
                service: service,
                estimated_cost: cost,
                availability: avail
            };

            emailjs.sendForm(serviceID, templateID, this, templateParams)
                .then(() => {
                    enquiryForm.style.display = 'none';
                    responseBox.style.display = 'block';
                    responseBox.innerHTML = `
                        <h3>Enquiry Sent Successfully</h3>
                        <p><strong>Estimated Cost:</strong> ${cost}</p>
                        <p><strong>Availability:</strong> ${avail}</p>
                        <p>We have received your request and will confirm your booking via email shortly.</p>
                    `;
                    responseBox.scrollIntoView({ behavior: 'smooth' });
                }, (err) => {
                    btn.textContent = "Submit Enquiry";
                    btn.disabled = false;
                    alert("Failed to send the enquiry. Please try again.\n\nError: " + JSON.stringify(err));
                });
        });
    }

    // ==========================================
    // 3. CONTACT FORM (EmailJS Integration)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const btn = this.querySelector('button');
            const responseBox = document.getElementById('contactResponse');

            btn.textContent = "Sending...";
            btn.disabled = true;

            const serviceID = 'service_q5r8kmb';
            const templateID = 'template_8pq5cum'; // CONTACT TEMPLATE ID

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    contactForm.style.display = 'none';
                    responseBox.style.display = 'block';
                    responseBox.innerHTML = `
                        <h3>Thank you!</h3>
                        <p>Your message has been sent successfully. We will get back to you shortly.</p>
                    `;
                    responseBox.scrollIntoView({ behavior: 'smooth' });
                }, (err) => {
                    btn.textContent = "Send Message";
                    btn.disabled = false;
                    alert("Failed to send the message. Please try again.\n\nError: " + JSON.stringify(err));
                });
        });
    }

    // ==========================================
    // 4. GALLERY LIGHTBOX (Products Page)
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const triggers = document.querySelectorAll('.product-card img');

    if (lightbox && triggers.length > 0) {
        triggers.forEach(img => {
            img.style.cursor = 'pointer'; 
            img.addEventListener('click', function() {
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src; 
            });
        });

        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 5. FAQ ACCORDION
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', function() {
                const parent = this.parentElement;
                const answer = this.nextElementSibling;
                
                // Toggle active class on the clicked item
                parent.classList.toggle('active');
                
                // Toggle the max-height for the slide effect
                if (parent.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });
    }
});