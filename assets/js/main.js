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

