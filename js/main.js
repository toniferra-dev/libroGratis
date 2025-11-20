// ==================== CONFIGURACIÓN INICIAL ====================
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initSmoothScroll();
    initScrollAnimations();
    initAccordion();
    console.log('✅ JavaScript cargado correctamente');
});

// ==================== VALIDACIÓN Y ENVÍO DE FORMULARIO ====================
function initFormValidation() {
    const form = document.getElementById('leadForm');
    const emailInput = form.querySelector('.form__input');
    const submitButton = form.querySelector('.form__button');
    
    // Validación en tiempo real
    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        
        const email = emailInput.value.trim();
        
        if (validateEmail(emailInput)) {
            // Animación del botón
            submitButton.innerHTML = '⏳ Enviando...';
            submitButton.disabled = true;
            
            // Simulación de envío (aquí iría la integración real)
            setTimeout(function() {
                handleSuccessfulSubmit(email, submitButton);
            }, 1500);
        } else {
            showError(emailInput, 'Por favor, introduce un email válido');
        }
    });
}

// Validar formato de email
function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        input.style.borderColor = 'var(--color-accent-green)';
        return true;
    } else if (email.length > 0) {
        input.style.borderColor = '#FF4444';
        return false;
    } else {
        input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        return false;
    }
}

// Mostrar error
function showError(input, message) {
    input.style.borderColor = '#FF4444';
    
    // Crear mensaje de error si no existe
    let errorMsg = input.parentElement.querySelector('.form__error');
    if (!errorMsg) {
        errorMsg = document.createElement('p');
        errorMsg.className = 'form__error';
        errorMsg.style.cssText = 'color: #FF4444; font-size: 0.875rem; margin-top: 0.5rem;';
        input.parentElement.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    
    // Eliminar mensaje después de 3 segundos
    setTimeout(function() {
        if (errorMsg && errorMsg.parentElement) {
            errorMsg.remove();
        }
    }, 3000);
}

// Manejo de envío exitoso
function handleSuccessfulSubmit(email, button) {
    // Cambiar texto del botón
    button.innerHTML = '✅ ¡PDF Enviado!';
    button.style.background = 'var(--color-accent-green)';
    
    // Crear mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'form__success';
    successMessage.style.cssText = `
        background-color: var(--color-accent-green);
        color: var(--color-bg-dark);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    successMessage.textContent = `📧 Revisa tu email (${email}) para descargar el PDF`;
    
    const form = button.closest('.form');
    form.appendChild(successMessage);
    
    // Aquí iría la integración real con:
    // - API de email (SendGrid, Mailchimp, etc.)
    // - Google Analytics event tracking
    // - Facebook Pixel
    console.log('📧 Email registrado:', email);
    
    // Resetear formulario después de 3 segundos
    setTimeout(function() {
        form.reset();
        button.innerHTML = '¡Quiero mi copia GRATIS! <span class="form__button-icon">→</span>';
        button.style.background = 'linear-gradient(135deg, var(--color-primary-blue), var(--color-primary-purple))';
        button.disabled = false;
        successMessage.remove();
    }, 5000);
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ==================== ANIMACIONES AL HACER SCROLL ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll('.card, .accordion__item, .author__profile');
    
    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ==================== FUNCIONALIDAD ACCORDION ====================
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(function(item) {
        const header = item.querySelector('.accordion__header');
        
        header.addEventListener('click', function() {
            // Cerrar otros items (opcional - comentar si quieres múltiples abiertos)
            accordionItems.forEach(function(otherItem) {
                if (otherItem !== item && otherItem.hasAttribute('open')) {
                    otherItem.removeAttribute('open');
                }
            });
        });
    });
}

// ==================== TRACKING Y ANALYTICS ====================
// Función para trackear eventos (integrar con Google Analytics, Facebook Pixel, etc.)
function trackEvent(eventName, eventData) {
    console.log('📊 Event tracked:', eventName, eventData);
    
    // Ejemplo de integración con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Ejemplo de integración con Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Trackear cuando el usuario hace scroll hasta ciertas secciones
function initScrollTracking() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split(' ')[0];
                trackEvent('section_view', {
                    section: sectionName
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(function(section) {
        sectionObserver.observe(section);
    });
}

// Inicializar tracking
initScrollTracking();

// ==================== FUNCIONES UTILITARIAS ====================

// Debounce para optimizar eventos de scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Detectar si el usuario está en mobile
function isMobile() {
    return window.innerWidth <= 767;
}

// Detectar si el usuario está en tablet
function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1023;
}

// Detectar si el usuario está en desktop
function isDesktop() {
    return window.innerWidth >= 1024;
}

// Log de información del dispositivo
console.log('📱 Device info:', {
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    width: window.innerWidth,
    height: window.innerHeight
});

// ==================== MANEJO DE RESIZE ====================
window.addEventListener('resize', debounce(function() {
    console.log('📐 Window resized:', {
        width: window.innerWidth,
        height: window.innerHeight
    });
}, 250));

// ==================== PREVENCIÓN DE SPAM ====================
// Limitar envíos del formulario
let lastSubmitTime = 0;
const submitCooldown = 5000; // 5 segundos

function canSubmit() {
    const now = Date.now();
    if (now - lastSubmitTime < submitCooldown) {
        return false;
    }
    lastSubmitTime = now;
    return true;
}

// ==================== EASTER EGG ====================
// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        console.log('🎮 Konami Code activado!');
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Crear animación rainbow
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(function() {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ==================== CONSOLA DE BIENVENIDA ====================
console.log('%c🚀 Aprende a Programar - Toni Ferrà', 'font-size: 20px; font-weight: bold; color: #4169E1;');
console.log('%c💻 Desarrollado con HTML, CSS y JavaScript vanilla', 'font-size: 14px; color: #7B68EE;');
console.log('%c📧 ¿Interesado en el código? Descarga el PDF gratis!', 'font-size: 12px; color: #A0A0A0;');
