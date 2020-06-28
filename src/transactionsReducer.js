const transactionsReducer = ((state, action) => {
    switch(action.type){
        case "ADD_TRANSACTION": {
            return [action.payload, ...state]
        }

        case "REMOVE_TRANSACTION": {
            return state.filter((transaction, index) => index !== action.payload.index)
        }

        default: {
            return state
        }
    }
})

export default transactionsReducer;