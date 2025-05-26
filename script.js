// Contador regressivo para a prova
// ... existing code ...
// Ativar marcos de progresso
// function initializeMilestones() { ... }

// Toggle de tema
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
             icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (icon) {
             icon.classList.replace(isLightMode ? 'fa-sun' : 'fa-moon', isLightMode ? 'fa-moon' : 'fa-sun');
        }
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Elementos de navegação
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const prevTrainingBtn = document.getElementById('prevTraining');
    const nextTrainingBtn = document.getElementById('nextTraining');
    const currentWeekTitle = document.getElementById('currentWeekTitle');
    const currentTrainingTitle = document.getElementById('currentTrainingTitle');

    // Elementos de progresso
    const progressBar = document.querySelector('.progress-bar');
    const milestones = document.querySelectorAll('.milestone');
    const totalMilestones = milestones.length; // Use totalMilestones for clarity

    // Estado atual
    let currentWeek = 1;
    let currentTraining = 1;

    // Função para atualizar a visualização
    function updateView() {
        console.log('updateView called. Current Week:', currentWeek);

        // Atualiza a exibição do contêiner da semana
        const weekContainers = document.querySelectorAll('.week-container');

        weekContainers.forEach(container => {
            container.style.display = 'none';
            container.classList.remove('active');
        });

        const currentWeekContainer = document.getElementById(`week-${currentWeek}`);
        if (!currentWeekContainer) {
            console.error('Week container not found for week:', currentWeek);
            return; // Safeguard
        }

        currentWeekContainer.style.display = 'block';
        currentWeekContainer.classList.add('active');

        // Atualiza título da semana
        const weekHeader = currentWeekContainer.querySelector('.week-header h2');
        if (weekHeader) {
            currentWeekTitle.textContent = weekHeader.textContent;
        }

        // Mostra apenas o treino atual
        const trainingCards = currentWeekContainer.querySelectorAll('.training-card');
        const trainingsPerWeek = trainingCards.length;

        trainingCards.forEach((card, index) => {
            card.style.display = index === currentTraining - 1 ? 'block' : 'none';
        });

        // Atualiza título do treino
        currentTrainingTitle.textContent = `Treino ${currentTraining} de ${trainingsPerWeek}`;

        // Atualiza estado dos botões
        prevWeekBtn.disabled = currentWeek === 1;
        nextWeekBtn.disabled = currentWeek === totalMilestones; // Use totalMilestones here
        prevTrainingBtn.disabled = currentTraining === 1;
        nextTrainingBtn.disabled = trainingsPerWeek === 0 || currentTraining === trainingsPerWeek;

        // --- Atualização da barra de progresso e marco ativo ---
        console.log('Updating progress bar for week:', currentWeek, 'Total milestones:', totalMilestones);
        milestones.forEach(m => m.classList.remove('active'));
        const currentMilestone = document.querySelector(`.milestone[data-week="${currentWeek}"]`);

        if (currentMilestone) {
            currentMilestone.classList.add('active');
            // Calculate progress based on currentWeek and total milestones
            // Assuming milestones represent weeks 1 through totalMilestones
            const progress = (currentWeek / totalMilestones) * 100; // Use totalMilestones here
            console.log('Calculated progress:', progress);
            progressBar.style.width = `${progress}%`;
            console.log('Progress bar width set to:', progressBar.style.width);
        } else {
            // Fallback/reset if no milestone is found for currentWeek
            console.warn('Milestone not found for week:', currentWeek);
            progressBar.style.width = '0%';
        }
        // --- Fim da atualização da barra de progresso e marco ativo ---

        // Save current week and training to local storage
        localStorage.setItem('currentWeek', currentWeek);
        localStorage.setItem('currentTraining', currentTraining);
        console.log('State saved to local storage: week', currentWeek, 'training', currentTraining);
    }

    // Event listeners para navegação
    prevWeekBtn.addEventListener('click', () => {
        console.log('Previous week button clicked');
        if (currentWeek > 1) {
            currentWeek--;
            currentTraining = 1; // Reset training to 1 when changing week
            updateView();
        }
    });

    nextWeekBtn.addEventListener('click', () => {
         console.log('Next week button clicked');
        if (currentWeek < totalMilestones) { // Use the pre-calculated totalMilestones
            currentWeek++;
            currentTraining = 1; // Reset training to 1 when changing week
            updateView();
        }
    });

    prevTrainingBtn.addEventListener('click', () => {
        console.log('Previous training button clicked');
        if (currentTraining > 1) {
            currentTraining--;
            updateView();
        }
    });

    nextTrainingBtn.addEventListener('click', () => {
        console.log('Next training button clicked');
        const currentWeekContainer = document.getElementById(`week-${currentWeek}`);
        const trainingCards = currentWeekContainer ? currentWeekContainer.querySelectorAll('.training-card') : [];
        const trainingsPerWeek = trainingCards.length;

        if (currentTraining < trainingsPerWeek) {
            currentTraining++;
            updateView();
        }
    });

    // Restaura a semana e treino ativos ao carregar a página
    const savedWeek = localStorage.getItem('currentWeek');
    const savedTraining = localStorage.getItem('currentTraining');

    if (savedWeek) {
        currentWeek = parseInt(savedWeek);
         console.log('Loaded week from local storage:', currentWeek);
    }
    if (savedTraining) {
        currentTraining = parseInt(savedTraining);
         console.log('Loaded training from local storage:', currentTraining);
    }

    // Inicializa a visualização
    console.log('Initializing view');
    updateView();

    // Inicializa o tema
    initializeTheme();
});

// initializeTheme(); // Already called inside DOMContentLoaded 