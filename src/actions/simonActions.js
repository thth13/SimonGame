var sound1 = new Audio("../sounds/1.mp3");
var sound2 = new Audio("../sounds/2.mp3");
var sound3 = new Audio("../sounds/3.mp3");
var sound4 = new Audio("../sounds/4.mp3");

var sounds = [sound1, sound2, sound3, sound4];

export const isTurn = () => {
    return {
        type: 'TURN_PLAYER'
    }
}

export const nextTurn = () => {
    return {
        type: 'NEXT_TURN'
    }
}

export const gameOver = () => {
    return {
        type: 'GAME_OVER'
    }
}

export const changeLevel = (data) => {
    return {
        type: 'CHANGE_LEVEL',
        payload: data
    }
}

export const startGame = () => dispatch =>{
    var data = Math.floor(Math.random() * (3 - 0)) + 0; // Делаем первый квадратик
    dispatch({
        type: 'START_GAME',
        payload: data
    })
    
    dispatch(lightUp(data, 500)) // Загораем квадратик
}

// Загореть квадратик
export const lightUp = (id, speed) => dispatch => {
    sounds[id].play();
    dispatch({
        type: 'LIGHT_UP',
        payload: id,
    })

    setTimeout(() => {
        dispatch({
            type: 'LIGHT_UP',
            payload: id
        })
    }, speed)
}


export const newRound = (list, level) => dispatch => {
    var nextLevel = Math.floor(Math.random() * (3 - 0)) + 0; // Определяем следующий квдаратик
    dispatch({
        type: 'NEW_ROUND',
        payload: nextLevel
    })

    list.push(nextLevel); // Добавляем новый квадратик, к тем что уже есть, что бы показать их

    dispatch(showTurns(list, level)) // Загораем квадратики
}

// Показываем квадратики
export const showTurns = (sequence, level) => dispatch => {
    let i = 0;

    var interval = setInterval(() => {
        dispatch(lightUp(sequence[i], 400))
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          dispatch(isTurn());
        }
      }, level)
}