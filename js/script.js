document.addEventListener('DOMContentLoaded', () => {
    
    // Component Loader met Promise
    const loadComponents = async () => {
        try {
            const [h, f] = await Promise.all([
                fetch('components/header.html').then(r => r.text()),
                fetch('components/footer.html').then(r => r.text())
            ]);
            
            document.getElementById('header-placeholder').innerHTML = h;
            document.getElementById('footer-placeholder').innerHTML = f;
            
            initUI(); // Start UI functies NA laden
        } catch (e) { console.error("Laden mislukt", e); }
    };

    const initUI = () => {
        // Mobiel Menu
        const btn = document.getElementById('mobile-btn');
        const nav = document.getElementById('nav-list');
        if(btn && nav) {
            btn.addEventListener('click', () => nav.classList.toggle('active'));
        }

        // Scroll Reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    loadComponents();
});