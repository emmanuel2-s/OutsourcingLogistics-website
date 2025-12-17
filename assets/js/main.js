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


