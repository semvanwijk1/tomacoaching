document.addEventListener('DOMContentLoaded', () => {
    
    // Componenten laden (Header/Footer)
    const loadComponents = async () => {
        try {
            const [headerRes, footerRes] = await Promise.all([
                fetch('components/header.html'),
                fetch('components/footer.html')
            ]);
            
            document.getElementById('header-placeholder').innerHTML = await headerRes.text();
            document.getElementById('footer-placeholder').innerHTML = await footerRes.text();
            
            // Start animaties nadat alles geladen is
            initAnimations();
        } catch (err) {
            console.error('Error loading components:', err);
        }
    };

    // Scroll Reveal Animaties
    const initAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    loadComponents();
});