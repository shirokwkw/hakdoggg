const messageBtn = document.getElementById('message-btn');
const musicBtn = document.getElementById('music-btn');
const photoBtn = document.getElementById('photo-btn');

const overlay = document.getElementById('overlay');

const messageModal = document.getElementById('message-modal');
const musicModal = document.getElementById('music-modal');
const photoModal = document.getElementById('photo-modal');

const backButtons = document.querySelectorAll('.back-button');

const music = document.getElementById('background-music');
music.volume = 0.3; // Set the volume to 30%

const lyricsContainer = document.getElementById('lyrics-container');

// Stanzas with individual delays for each
const stanzas = [
    {
        lines: [
            "Cause there is something, and there is nothing ",
            "There is nothing in between",
            "And in my eyes,",
            "there is a tiny dancer",
            "Watching over me"
        ],
        charDelays: [0.08, 0.08, 0.11, 0.13, 0.13],
        lineDelays: [0.2, 0.5, 0.5, 0.2, 0.2]
    },
    {
        lines: [
            "He's singing,",
            "She's a, she's a laaady",
            "And I am just a boy",
            "He's singing,",
            "She's a, she's a laady",
            "And I am just a line without a-"
        ],
        charDelays: [0.08, 0.09, 0.09,  0.08, 0.09, 0.09,],
        lineDelays: [2, 0.8, 1.3,  1.1, 0.8, 1.3]
    },
    {
        lines: [
            "Oh, baby, I am a wreck, when I'm without you :<",
            "I need you here to stay ",
            "Broke all my bones that day I found you",
            "Crying at the lake "
        ],
        charDelays: [0.12, 0.08, 0.08, 0.09],
        lineDelays: [3, 0.5, 0.7, 1.3]
    },
    {
        lines: [
            "Oh, was it something",
            "I said to make you feel like you're a burden?",
            "Oh, and if I could take it all back",
            "I swear that I ",
            "Would pull you from the tide"
        ],
        charDelays: [0.125, 0.08, 0.08, 0.08, 0.08],
        lineDelays: [5, 0.5, 0.7, 0.5, 0.5]
    }
];

let typingInterval;  // Store the typing interval to stop it

// Function to reset the music state
function resetMusicState() {
    lyricsContainer.innerHTML = '';  // Clear the displayed lyrics
    music.pause();  // Pause the music
    music.currentTime = 0;  // Reset the music to the beginning
    clearInterval(typingInterval);  // Stop the typing effect if it’s running
}

// Start playing the music and restart the lyrics
function playMusicAndLyrics() {
    resetMusicState();  // Reset the music and lyrics before playing
    music.play();  // Start the music
    typeStanza(stanzas[0], 0);  // Start the first stanza
}

// Function to display a single stanza with typing effect
function typeStanza(stanza, stanzaIndex) {
    let lineIndex = 0;  // Track which line we are typing

    function typeLine() {
        if (lineIndex < stanza.lines.length) {
            const line = stanza.lines[lineIndex]; // Get each line
            let charIndex = 0;

            function typeCharacter() {
                if (charIndex < line.length) {
                    lyricsContainer.innerHTML += line[charIndex];  // Append each character
                    charIndex++;
                    typingInterval = setTimeout(typeCharacter, stanza.charDelays[lineIndex] * 1000);  // Use individual charDelays for each stanza
                } else {
                    // After finishing the line, add a line break
                    lyricsContainer.innerHTML += '<br>';
                    lineIndex++;  // Move to the next line
                    typingInterval = setTimeout(typeLine, stanza.lineDelays[lineIndex] * 1000); // Add line delay before typing next line
                }
            }

            typeCharacter();
        } else {
            // Check if this is the 3rd stanza (index 2)
            if (stanzaIndex === 2) {
                setTimeout(() => {
                    lyricsContainer.innerHTML = '';  // Clear the 3rd stanza after 0.5s
                    typeStanza(stanzas[stanzaIndex + 1], stanzaIndex + 1);  // Move to the 4th stanza
                }, 500); // 0.5-second delay
            }
            // Check if this is not the last stanza
            else if (stanzaIndex < stanzas.length - 1) {
                lyricsContainer.innerHTML = '';  // Clear the lyrics
                typeStanza(stanzas[stanzaIndex + 1], stanzaIndex + 1);  // Move to next stanza
            }
        }
    }

    typeLine();
}

// Function to open the modal and start music and lyrics
function openModal(modal) {
    modal.classList.add('active');
    overlay.classList.add('active');
    if (modal === musicModal) {
        playMusicAndLyrics();  // Play music and start typing lyrics
    }
}

// Function to close the modal and reset music state
function closeModal() {
    document.querySelectorAll('.modal').forEach((modal) => {
        modal.classList.remove('active');
    });
    overlay.classList.remove('active');
    resetMusicState();  // Reset music and lyrics state
}

// Event listeners for button actions
messageBtn.addEventListener('click', () => openModal(messageModal));
musicBtn.addEventListener('click', () => openModal(musicModal));
photoBtn.addEventListener('click', () => openModal(photoModal));

// Back buttons to close the modals
backButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
});

// Close the modal if overlay is clicked
overlay.addEventListener('click', closeModal);

// Loop the music and lyrics when the song ends
music.addEventListener('ended', () => {
    playMusicAndLyrics();  // Restart the music and lyrics
});