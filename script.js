document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageDiv = document.getElementById('message');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);

    const emojis = ['🎉', '🎊', '🎈', '🍭', '🍫'];

    const checkWin = (board) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], pattern };
            }
        }
        return null;
    };

    const handleClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');
        if (!board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            const result = checkWin(board);
            if (result) {
                showMessage(`${result.winner} wins!`);
                highlightCells(result.pattern);
                throwEmojis();
                setTimeout(resetBoard, 3000);
            } else if (!board.includes(null)) {
                showMessage('It\'s a tie!');
                setTimeout(resetBoard, 3000);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    const resetBoard = () => {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('highlight');
        });
        currentPlayer = 'X';
        hideMessage();
        clearEmojis();
    };

    const showMessage = (message) => {
        messageDiv.textContent = message;
        messageDiv.classList.add('show');
    };

    const hideMessage = () => {
        messageDiv.classList.remove('show');
    };

    const highlightCells = (pattern) => {
        pattern.forEach(index => {
            cells[index].classList.add('highlight');
        });
    };

    const throwEmojis = () => {
        const emojiContainer = document.createElement('div');
        emojiContainer.classList.add('emoji-container');
        document.body.appendChild(emojiContainer);
        for (let i = 0; i < 30; i++) {
            const emoji = document.createElement('div');
            emoji.classList.add('emoji');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = `${Math.random() * 100}vw`;
            emoji.style.animationDelay = `${Math.random() * 2}s`;
            emojiContainer.appendChild(emoji);
        }
    };

    const clearEmojis = () => {
        const emojiContainer = document.querySelector('.emoji-container');
        if (emojiContainer) {
            emojiContainer.remove();
        }
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetBoard);
});
