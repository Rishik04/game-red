document.addEventListener('DOMContentLoaded', () => {
    const x = 'x';
    const o = 'o';
    const squares = document.querySelectorAll('.grid div');
    const container = document.querySelector('.container');
    const winningMessage = document.querySelector('.winningText');
    const winningMessageEnd = document.querySelector('.winningMessage');
    const restart = document.getElementById("restart");
    const details = document.querySelector('.details');
    const Play = document.getElementById('play');
    const winning = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],   //horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  //vertical
        [0, 4, 8], [2, 4, 6]
    ]
    let PlayerX;
    play.addEventListener("click", FirstPage);
    function FirstPage() {
        details.classList.add('alter');
    }
    start();
    restart.addEventListener("click", start);
    function start() {
        PlayerX = true;
        squares.forEach(square => {
            square.classList.remove(x);
            square.classList.remove(o);
            square.removeEventListener('click', Clicked);
            square.addEventListener('click', Clicked, { once: true });
        });
        turnHover();
        winningMessageEnd.classList.remove('show');
    }
    function Clicked(e) {
        const cell = e.target;
        const currentClass = PlayerX ? x : o;
        mark(cell, currentClass);

        if (winner(currentClass)) {
            end(false);
        }
        else if (isDraw()) {
            end(true);
        }
        else {
            turn();
            turnHover();
        }
    }
    function end(draw) {
        if (draw) {
            winningMessage.innerText = `Ohh It's a Draw!!`;
        }
        else {
            winningMessage.innerText = `${PlayerX ? "Cross" : "Skull"} Wins!!`;
        }
        winningMessageEnd.classList.add('show');
    }
    function isDraw() {
        return [...squares].every(cell => {
            return cell.classList.contains(x) ||
                cell.classList.contains(o)
        });
    }
    function mark(cell, currentClass) {
        cell.classList.add(currentClass);
    }
    function turn() {
        PlayerX = !PlayerX;
    }
    function turnHover() {
        container.classList.remove(x);
        container.classList.remove(o);
        if (PlayerX) {
            container.classList.add(x);
        }
        else {
            container.classList.add(o);
        }
    }
    function winner(currentClass) {
        return winning.some(combination => {
            return combination.every(index => {
                return squares[index].classList.contains(currentClass);
            });
        });
    }
});
