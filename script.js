// Background music
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
const yesBtn = document.getElementById('yes');
        
// Play music
window.addEventListener('load', () => {
    bgMusic.volume = 0.3; // Quiet background music
    bgMusic.play().catch(e => {
        console.log('Autoplay blocked, click anywhere to enable music');
    });
});

// Enable music on click 'Yes' button
yesBtn.addEventListener('click', function enableMusic() {
    bgMusic.play().catch(e => console.log('Music play failed'));
    document.removeEventListener('click', enableMusic);
    }, { once: true });

// Mute/unmute toggle
let isMuted = false;
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
});

// Hearts animation
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['❤️','💖','💗','💝'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';

    document.getElementById('hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

let heartInterval = null;
function startHearts() {
    if (heartInterval) return; // avoid duplicate intervals
    heartInterval = setInterval(createHeart, 300);
}
yesBtn.addEventListener('click', startHearts);

// No button runs away
const noBtn = document.getElementById('no');
noBtn.addEventListener('mouseenter', (e) => {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
});

// Yes button - show celebration (music continues playing)
document.getElementById('yes').addEventListener('click', () => {
    document.getElementById('question').style.display = 'none';
    document.getElementById('celebration').style.display = 'flex';
    document.getElementById('backBtn').style.display = 'block';
    createConfetti();
    // Music keeps playing automatically (already looping)
});
