document.addEventListener('DOMContentLoaded', () => {
    // Laad Header en Footer in
    const loadComponents = async () => {
        try {
            const [headerRes, footerRes] = await Promise.all([
                fetch('components/header.html'),
                fetch('components/footer.html')
            ]);
            
            document.getElementById('header-placeholder').innerHTML = await headerRes.text();
            document.getElementById('footer-placeholder').innerHTML = await footerRes.text();
            
            // Initialiseer Mobiel Menu NA laden
            initMobileMenu();
        } catch (err) {
            console.error('Error loading components:', err);
        }
    };

    const initMobileMenu = () => {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.nav-overlay');

        if(toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                overlay.classList.toggle('active');
                toggle.classList.toggle('open');
            });

            overlay.addEventListener('click', () => {
                nav.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
    };

    loadComponents();
});