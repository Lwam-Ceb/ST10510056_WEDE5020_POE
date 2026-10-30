document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DYNAMIC PRODUCTS & SEARCH (Products Page)
    // ==========================================
    const products = [
        { id: 1, name: "JingoTech Gaming PC", category: "Gaming PC", img: "../assets/images/GamingPC.jpg", desc: "High-performance computer for gaming." },
        { id: 2, name: "JingoTech Office PC", category: "Office PC", img: "../assets/images/AMD_RYZEN_WORKPC.jpg", desc: "Reliable performance for work and study." },
        { id: 3, name: "Computer Components", category: "Components", img: "../assets/images/MSI_GEFORCE_RTX5070.jpg", desc: "Upgrade your system with quality hardware." },
        { id: 4, name: "Performance Upgrades", category: "Upgrades", img: "../assets/images/GraphicsCard.jpg", desc: "Give your existing computer a new lease on life." }
    ];

    const productGrid = document.getElementById('dynamic-product-grid');
    const searchInput = document.getElementById('productSearch');

    function displayProducts(productsToDisplay) {
        if (!productGrid) return;
        productGrid.innerHTML = ''; 

        productsToDisplay.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h1>${product.category}</h1>
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <a href="enquiry.html">Enquire Now →</a>
            `;
            productGrid.appendChild(card);
        });
    }

    if (productGrid) {
        displayProducts(products); // Load all initially

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.category.toLowerCase().includes(term)
            );
            displayProducts(filtered);
        });
    }

    // ==========================================
    // 2. AJAX ENQUIRY FORM SIMULATION (Enquiry Page)
    // ==========================================
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload (AJAX)
            const service = document.getElementById('service').value;
            const btn = this.querySelector('button');
            const responseBox = document.getElementById('enquiryResponse');

            btn.textContent = "Processing...";
            btn.disabled = true;

            setTimeout(() => { // Simulate server delay
                let cost = "Varies", avail = "Contact us";
                if (service === 'repair') { cost = "R500 - R1500"; avail = "Next 2 business days"; }
                if (service === 'custom-build') { cost = "R5000+"; avail = "3-5 business days"; }

                enquiryForm.style.display = 'none';
                responseBox.style.display = 'block';
                responseBox.innerHTML = `
                    <h3>Enquiry Processed</h3>
                    <p><strong>Estimated Cost:</strong> ${cost}</p>
                    <p><strong>Availability:</strong> ${avail}</p>
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
            e.preventDefault(); // Stop page reload
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            const btn = this.querySelector('button');
            const responseBox = document.getElementById('contactResponse');

            btn.textContent = "Sending...";
            btn.disabled = true;

            setTimeout(() => {
                // Mailto link to simulate emailing
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

});