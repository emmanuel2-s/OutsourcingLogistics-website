document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    let hasAnimated = false;

    const startCounting = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let current = 0;
            const increment = Math.ceil(target / 100);

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = current;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.disconnect(); // run once
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(document.querySelector(".stats-section"));
});



document.addEventListener("DOMContentLoaded", () => {
    const logos = document.querySelectorAll(".client-logo");

    logos.forEach(logo => {
        logo.style.opacity = "0";
        logo.style.transform = "translateY(30px)";
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = "0.6s ease";
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.3 }
    );

    logos.forEach(logo => observer.observe(logo));
});


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(
        ".animate-left, .animate-right"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.transitionDelay = delay + "ms";
                    entry.target.classList.add("animate-show");
                }
            });
        },
        { threshold: 0.25 }
    );

    items.forEach((item) => observer.observe(item));
});



// Contact form function //

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnSpinner = document.getElementById("btn-spinner");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button & show spinner
    submitBtn.disabled = true;
    btnSpinner.classList.remove("d-none");
    btnText.textContent = "Sending...";

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            form.reset();
            status.className = "alert alert-success mt-3";
            status.textContent =
                "Thank you! Your message has been sent successfully.";

            // Auto-hide after 5 seconds
            setTimeout(() => {
                status.classList.add("d-none");
            }, 5000);
        } else {
            status.className = "alert alert-danger mt-3";
            status.textContent =
                "Oops! Something went wrong. Please try again.";
        }
    } catch (error) {
        status.className = "alert alert-danger mt-3";
        status.textContent =
            "Network error. Please check your internet connection.";
    } finally {
        // Re-enable button & hide spinner
        submitBtn.disabled = false;
        btnSpinner.classList.add("d-none");
        btnText.textContent = "Send Message";
    }
});




