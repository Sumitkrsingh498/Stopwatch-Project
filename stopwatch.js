const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapTimesList = document.getElementById('lapTimesList');
const themeToggleButton = document.getElementById('themeToggleButton');
const themeIcon = document.getElementById('themeIcon');
const totalLapTimeDisplay = document.getElementById('totalLapTimeDisplay');
// Initializing variables for stopwatch logic
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    const pad = (num, length = 2) => num.toString().padStart(length, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;

        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
        lapButton.style.display = 'inline-block';
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;

        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
        lapButton.style.display = 'none';
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 0;

    timeDisplay.textContent = '00:00:00.000';
    lapTimesList.innerHTML = '';
    totalLapTimeDisplay.textContent = 'Total Time: 00:00:00.000'; 
    totalLapTimeDisplay.style.display = 'none';

    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    lapButton.style.display = 'none';
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${formatTime(elapsedTime)}</span>`;
        lapTimesList.prepend(lapItem);

         totalLapTimeDisplay.textContent = `Total Time: ${formatTime(elapsedTime)}`;
        totalLapTimeDisplay.style.display = 'block';
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('light-mode');
    const isLightMode = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeIcon.textContent = isLightMode ? '🌙' : '☀️';
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeIcon.textContent = '🌙';
    } else {
        document.documentElement.classList.remove('light-mode');
        themeIcon.textContent = '☀️';
    }
}

applySavedTheme();

// Event Listeners for buttons
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
themeToggleButton.addEventListener('click', toggleTheme);



