document.addEventListener('DOMContentLoaded', () => {
    // Login Logic
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const appContent = document.getElementById('app-content');
    const loginError = document.getElementById('login-error');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const logoutBtn = document.getElementById('theme-toggle');

    // Check session
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        if (loginContainer) loginContainer.style.display = 'none';
        if (appContent) appContent.style.display = 'block';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = usernameInput.value.trim();
            const pass = passwordInput.value.trim();

            if (user === 'admin' && pass === '1234') {
                sessionStorage.setItem('isLoggedIn', 'true');
                loginContainer.style.opacity = '0';
                loginContainer.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loginContainer.style.display = 'none';
                    appContent.style.display = 'block';
                    appContent.style.animation = 'slideUp 0.8s ease-out';
                }, 500);
            } else {
                loginError.textContent = 'Usuario o contraseña incorrectos';
                const loginCard = document.querySelector('.login-card');
                // Shake animation
                loginCard.style.transform = 'translateX(-10px)';
                setTimeout(() => loginCard.style.transform = 'translateX(10px)', 100);
                setTimeout(() => loginCard.style.transform = 'translateX(-10px)', 200);
                setTimeout(() => loginCard.style.transform = 'translateX(0)', 300);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.textContent = 'Salir';
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            appContent.style.display = 'none';
            loginContainer.style.display = 'flex';
            loginContainer.style.opacity = '1';
            usernameInput.value = '';
            passwordInput.value = '';
            loginError.textContent = '';
        });
    }

    // 3D effect for the main card on mousemove
    const mainCard = document.querySelector('.main-card');
    const heroVisual = document.querySelector('.hero-visual');

    if (mainCard && heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();

            // Calculate mouse position relative to the container center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate rotation based on mouse position
            // Max rotation is 15 degrees
            const rotateY = (x / (rect.width / 2)) * 15;
            const rotateX = -(y / (rect.height / 2)) * 15;

            // Apply transformation
            mainCard.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
            mainCard.style.transition = 'transform 0.1s ease-out';
            mainCard.style.animation = 'none'; // pause floating animation while interacting
        });

        heroVisual.addEventListener('mouseleave', () => {
            // Reset to default floating state when mouse leaves
            mainCard.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg)`;
            mainCard.style.transition = 'transform 0.5s ease';

            // Restart animation after transition completes
            setTimeout(() => {
                mainCard.style.animation = 'floatCard 6s ease-in-out infinite';
            }, 500);
        });
    }

    // Interactive button particles effect
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            const rect = startBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.left = `${x - 50}px`;
            ripple.style.top = `${y - 50}px`;
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

            startBtn.style.position = 'relative';
            startBtn.style.overflow = 'hidden';
            startBtn.appendChild(ripple);

            // trigger animation
            requestAnimationFrame(() => {
                ripple.style.transform = 'scale(3)';
                ripple.style.opacity = '0';
            });

            setTimeout(() => ripple.remove(), 500);
        });
    }
});
