document.addEventListener('DOMContentLoaded', function() {
    // Efecto de cursor personalizado
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Efecto de enlace hover para cursor
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Efecto de escritura automática
    const typed = new Typed('.typing', {
        strings: ['Frontend', 'Backend', 'Full Stack'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    
    // Filtro de proyectos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animación al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content, .education-item, .experience-item');
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                el.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
    
    // Smooth scrolling para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar color de header al hacer scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Mostrar barras de progreso cuando son visibles
    const skillCards = document.querySelectorAll('.skill-card');
    
    const showProgressBars = () => {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                const progressBar = card.querySelector('.progress-bar');
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    };
    
    window.addEventListener('scroll', showProgressBars);
    showProgressBars(); // Ejecutar al cargar la página
    
/* Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar el código para enviar el formulario
            alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
            this.reset();
        });
    }
});*/});

document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');
    const container = document.querySelector('.orbital-container');
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const baseRadius = 150; // Radio de la órbita principal
    const speed = 0.010; // Velocidad de rotación
    let angle = 0;

    // Asignar un ángulo inicial a cada icono para distribuirlos
    icons.forEach((icon, index) => {
        icon.initialAngle = (index * (2 * Math.PI / icons.length));
    });

    function animate() {
        angle += speed;

        icons.forEach(icon => {
            // Calcular el ángulo actual del icono
            const currentAngle = icon.initialAngle + angle;
            
            // Para un efecto de "entrelazado", variamos el radio
            // Aquí, hacemos que el radio se ondule con el tiempo
            const dynamicRadius = baseRadius + Math.sin(currentAngle * 2) * 25;

            // Calcular las posiciones x e y usando trigonometría
            const x = centerX + dynamicRadius * Math.cos(currentAngle);
            const y = centerY + dynamicRadius * Math.sin(currentAngle);

            // Aplicar la transformación para mover el icono
            // Se resta la mitad del tamaño del icono para centrarlo correctamente
            icon.style.transform = `translate(${x - icon.offsetWidth / 2}px, ${y - icon.offsetHeight / 2}px)`;
        });

        requestAnimationFrame(animate); // Crea un bucle de animación suave
    }

    animate();
});