document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Component Loader
    const loadComponents = async () => {
        try {
            const [headerRes, footerRes] = await Promise.all([
                fetch('components/header.html'),
                fetch('components/footer.html')
            ]);
            
            document.getElementById('header-placeholder').innerHTML = await headerRes.text();
            document.getElementById('footer-placeholder').innerHTML = await footerRes.text();
            
            initMobileMenu();
            initScrollReveal();
            setActiveLink();
        } catch (err) {
            console.error('Fout bij laden componenten:', err);
        }
    };

    // 2. Mobile Menu Logica
    const initMobileMenu = () => {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-menu');
        if(toggle && nav) {
            toggle.addEventListener('click', () => nav.classList.toggle('active'));
        }
    };

    // 3. Scroll Reveal Animaties (Moving parts)
    const initScrollReveal = () => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    // 4. Actieve pagina indicator
    const setActiveLink = () => {
        const currentPath = window.location.pathname.split("/").pop();
        document.querySelectorAll('.nav-menu a').forEach(link => {
            if(link.getAttribute('href') === currentPath) {
                link.style.color = 'var(--primary)';
                link.style.fontWeight = '700';
            }
        });
    };

    loadComponents();
});