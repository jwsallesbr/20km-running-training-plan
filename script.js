// Contador regressivo para a prova
// ... existing code ...
// Ativar marcos de progresso
function initializeMilestones() {
    const progressBar = document.querySelector('.progress-bar');
    const milestones = document.querySelectorAll('.milestone');
    const totalWeeks = milestones.length;

    milestones.forEach(item => {
        item.addEventListener('click', event => {
            const weekNumber = parseInt(event.currentTarget.dataset.week);
            
            // Update active milestone
            milestones.forEach(m => m.classList.remove('active'));
            event.currentTarget.classList.add('active');
            
            // Calculate and update progress bar
            const progress = (weekNumber / totalWeeks) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Save user preference
            localStorage.setItem('activeWeek', weekNumber);
            
            // Scroll to the corresponding week section
            const weekSection = document.querySelector(`#week-${weekNumber}`);
            if (weekSection) {
                weekSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Restore active week and progress
    const activeWeek = localStorage.getItem('activeWeek');
    if (activeWeek) {
        const weekNumber = parseInt(activeWeek);
        const progress = (weekNumber / totalWeeks) * 100;
        progressBar.style.width = `${progress}%`;
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
    initializeMilestones();
    initializeTheme();
}); 