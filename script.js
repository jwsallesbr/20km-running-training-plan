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
    const statCards = document.querySelectorAll('.stat-card');

    // Elementos de progresso
    const progressBar = document.querySelector('.progress-bar');
    const milestones = document.querySelectorAll('.milestone');

    // Estado atual
    let currentWeek = 1;
    let currentTraining = 1;
    let currentLevel = 'beginner';

    // Função para atualizar a visualização
    function updateView() {
        // Atualiza a exibição do contêiner da semana
        const weekContainers = document.querySelectorAll('.week-container');
        weekContainers.forEach(container => {
            container.style.display = 'none';
            container.classList.remove('active');
        });

        const currentWeekContainer = document.getElementById(`week-${currentWeek}-${currentLevel}`);
        if (!currentWeekContainer) {
            return;
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
        nextWeekBtn.disabled = currentWeek === 6;
        prevTrainingBtn.disabled = currentTraining === 1;
        nextTrainingBtn.disabled = trainingsPerWeek === 0 || currentTraining === trainingsPerWeek;

        // Atualiza a barra de progresso
        const progress = (currentWeek / 6) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Atualiza marcos ativos
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach(m => m.classList.remove('active'));
        const currentMilestone = document.querySelector(`.milestone[data-week="${currentWeek}"]`);
        if (currentMilestone) {
            currentMilestone.classList.add('active');
        }

        // Salva o estado atual
        localStorage.setItem('currentWeek', currentWeek);
        localStorage.setItem('currentTraining', currentTraining);
        localStorage.setItem('currentLevel', currentLevel);
    }

    // Função para ativar um nível específico
    function activateLevel(level) {
        // Remove a classe 'active' de todos os cartões de estatísticas
        statCards.forEach(card => card.classList.remove('active'));

        // Adiciona a classe 'active' ao cartão correspondente ao nível selecionado
        const selectedCard = document.querySelector(`.stat-card[data-level="${level}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }

        // Atualiza o estado e a visualização
        currentLevel = level;
        currentWeek = 1;
        currentTraining = 1;
        updateView();
    }

    // Event listeners para navegação
    prevWeekBtn.addEventListener('click', () => {
        if (currentWeek > 1) {
            currentWeek--;
            currentTraining = 1;
            updateView();
        }
    });

    nextWeekBtn.addEventListener('click', () => {
        if (currentWeek < 6) {
            currentWeek++;
            currentTraining = 1;
            updateView();
        }
    });

    prevTrainingBtn.addEventListener('click', () => {
        if (currentTraining > 1) {
            currentTraining--;
            updateView();
        }
    });

    nextTrainingBtn.addEventListener('click', () => {
        const currentWeekContainer = document.getElementById(`week-${currentWeek}-${currentLevel}`);
        const trainingCards = currentWeekContainer ? currentWeekContainer.querySelectorAll('.training-card') : [];
        const trainingsPerWeek = trainingCards.length;

        if (currentTraining < trainingsPerWeek) {
            currentTraining++;
            updateView();
        }
    });

    // Event listeners para seleção de nível (apenas cartões)
    statCards.forEach(card => {
        card.addEventListener('click', () => {
            activateLevel(card.dataset.level);
        });
    });

    // Restaura o estado salvo
    const savedWeek = localStorage.getItem('currentWeek');
    const savedTraining = localStorage.getItem('currentTraining');
    const savedLevel = localStorage.getItem('currentLevel');

    if (savedWeek) currentWeek = parseInt(savedWeek);
    if (savedTraining) currentTraining = parseInt(savedTraining);
    if (savedLevel) {
        currentLevel = savedLevel;
    }

    // Inicializa a visualização (usando a função activateLevel para garantir o estado inicial correto)
    const initialLevel = savedLevel || 'beginner';
    activateLevel(initialLevel);

    // Inicializa o tema
    initializeTheme();
}); 