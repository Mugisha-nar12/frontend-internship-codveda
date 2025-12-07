const countElement = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');

let count = 0;

function updateCount() {
    countElement.textContent = count;
}

incrementButton.addEventListener('click', () => {
    count++;
    updateCount();
});

decrementButton.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateCount();
    }
});

resetButton.addEventListener('click', () => {
    count = 0;
    updateCount();
});