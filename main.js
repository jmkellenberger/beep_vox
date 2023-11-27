const form = document.getElementById("form");
const displayElement = document.getElementById('dialogueDisplay');
const audioContext = new window.AudioContext();
const pitchSlider = document.getElementById('pitchSlider');
const waveType = document.getElementById('waveType');
const textSpeed = document.getElementById('textSpeed');

const speeds = [
    ["fast", 75],
    ["medium", 125],
    ["slow", 175]
];

speeds.map(([text, value]) => {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    textSpeed.appendChild(option);
});


const waves = ["triangle", "square", "sawtooth", "sine"];

waves.map(wave => {
    const option = document.createElement('option');
    option.value = wave;
    option.text = wave;
    waveType.appendChild(option);
});

function playBeep(wave, pitch) {
    let oscillator = audioContext.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(pitch, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.01);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const playDialogue = async (input, wave, pitch, speed) => {
    displayElement.textContent = "";
    for (let char of input) {
        const pitchMod = char.charCodeAt(0) * 5;
        await sleep(speed);
        playBeep(wave, pitch + pitchMod);
        displayElement.textContent += char;
        console.log(char)
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const dialogue = new FormData(event.target).get("dialogue");
    const pitch = Number(pitchSlider.value);
    const wave = waveType.value;
    const speed = Number(textSpeed.value);
    playDialogue(dialogue, wave, pitch, speed);
});
