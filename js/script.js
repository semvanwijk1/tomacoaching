document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Componenten laden
    const loadComponents = async () => {
        try {
            const [h, f] = await Promise.all([
                fetch('components/header.html').then(res => res.text()),
                fetch('components/footer.html').then(res => res.text())
            ]);
            document.getElementById('header-placeholder').innerHTML = h;
            document.getElementById('footer-placeholder').innerHTML = f;
            
            initMobileNav();
            initHeaderScroll();
            initAnimations();
        } catch (err) { console.error("Components failed to load", err); }
    };

    // 2. Mobiele Navigatie (Boterzacht)
    const initMobileNav = () => {
        const toggle = document.getElementById('menuToggle');
        const menu = document.getElementById('navMenu');
        
        if(toggle && menu) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
                document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
            });
            
            // Sluit menu bij klik op link
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    menu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    };

    // 3. Header Effect op Scroll
    const initHeaderScroll = () => {
        const header = document.getElementById('mainHeader');
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    };

    // 4. Scroll Animaties
    const initAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    loadComponents();
});