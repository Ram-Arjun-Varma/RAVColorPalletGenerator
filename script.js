const paletteContainer = document.getElementById('palette');
const randomizeBtn = document.getElementById('randomizeBtn');

const colors = [];
const lockedColors = new Set();

// Generate a random color in hex format
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Update the palette display
function updatePalette() {
    paletteContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const color = colors[i];
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box flex items-center justify-center text-white font-bold';
        colorBox.style.backgroundColor = color;

        // Create lock/unlock button
        const lockBtn = document.createElement('button');
        lockBtn.className = 'lock-btn bg-blue-500';
        lockBtn.textContent = lockedColors.has(i) ? 'Unlock' : 'Lock';
        lockBtn.addEventListener('click', () => toggleLock(i));

        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn bg-green-500 mr-20';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', () => copyColorToClipboard(color));

        // Append buttons to the color box
        colorBox.appendChild(copyBtn);
        colorBox.appendChild(lockBtn);
        paletteContainer.appendChild(colorBox);
    }
}

// Toggle lock/unlock for color boxes
function toggleLock(index) {
    if (lockedColors.has(index)) {
        lockedColors.delete(index);
    } else {
        lockedColors.add(index);
    }
    updatePalette();
}

// Copy color code to clipboard
function copyColorToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
    });
}

// Randomize colors
function randomizePalette() {
    for (let i = 0; i < 5; i++) {
        if (!lockedColors.has(i)) {
            colors[i] = getRandomColor();
        }
    }
    updatePalette();
}

// Initialize with random colors
randomizePalette();

// Randomize button action
randomizeBtn.addEventListener('click', randomizePalette);