const initialState = {
    isGame: false,
    isTurn: false,
    turn: 0,
    list: [],
    isOver: false,
    fields: [false, false, false],
    level: 1000
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                isGame: !state.isGame,
                isTurn: true,
                list: [action.payload],
                isOver: false
            }
        case 'LIGHT_UP':
            return {
                ...state,
                fields: state.fields.map((item, index) => index.toString() === action.payload.toString() ? item =! item:item
                )
            }
        case 'TURN_PLAYER':
            return {
                ...state,
                isTurn: true
            }
        case 'NEW_ROUND':
            return {
                ...state,
                list: [...state.list, action.payload],
                turn: 0,
                isTurn: false
            }
        case 'NEXT_TURN':
            return {
                ...state,
                turn: ++state.turn
            }
        case 'GAME_OVER':
            return {
                ...state,
                isGame: false,
                isTurn: false,
                turn: 0,
                isOver: true
            }
        case 'CHANGE_LEVEL':
            return {
                ...state,
                level: action.payload
            }
        default:
            return state;
    }
}