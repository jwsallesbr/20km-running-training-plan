// Contador regressivo para a prova
function updateCountdown() {
    const raceDate = new Date('2025-07-06T00:00:00');
    const now = new Date();
    const difference = raceDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Ativar marcos de progresso
function initializeMilestones() {
    document.querySelectorAll('.milestone').forEach(item => {
        item.addEventListener('click', event => {
            document.querySelectorAll('.milestone').forEach(m => m.classList.remove('active'));
            event.currentTarget.classList.add('active');
            // Salvar preferência do usuário
            localStorage.setItem('activeWeek', event.currentTarget.dataset.week);
        });
    });

    // Restaurar semana ativa salva
    const activeWeek = localStorage.getItem('activeWeek');
    if (activeWeek) {
        document.querySelector(`.milestone[data-week="${activeWeek}"]`)?.classList.add('active');
    }
}

// Toggle de tema
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        const isLightMode = document.body.classList.contains('light-mode');
        
        icon.classList.replace(isLightMode ? 'fa-sun' : 'fa-moon', isLightMode ? 'fa-moon' : 'fa-sun');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateCountdown, 1000);
    updateCountdown();
    initializeMilestones();
    initializeTheme();
}); 