const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://localhost:3000');

function setStatus(value) {
    status.innerHTML = value;
}

function playBackgroundMusic() {
    const audio = document.getElementById('matrix-theme');
    audio.volume = 0.05;
    audio.play();
}

function showRabbit() {
    const rabbit = document.getElementById('white-rabbit');
    setTimeout(() => {
        rabbit.style.opacity = '1';
        setTimeout(() => {
            rabbit.style.opacity = '0';
        },1000);
    }, 30000);
}

function showMessage(value) {
    const li = document.createElement('li');
    li.innerHTML = value;
    document.getElementById('server-message').play();
    messages.appendChild(li);
}

function printMessage(value) {
    if(value === "Come with me... It's time to know the TRUTH!") {
        document.getElementById('matrix-theme').pause();
        document.getElementById('matrix-final').play();
        setTimeout(() => {
            document.getElementById('matrix-gif').style.display = 'block';
        }, 3000);

    }
    if(value === 'Knock, knock, Neo.') {

        showMessage(value);
        document.getElementById('knock').play();
    } else {
        showMessage(value);
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    ws.send(input.value);
    input.value = '';
});

ws.onopen = () => setStatus('CONNECTED');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = response => printMessage(response.data);


playBackgroundMusic();
showRabbit();