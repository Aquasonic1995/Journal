export const initialState = {
    isValid: {
        title: true,
        date: true,
        text: true
    },
    values: {
        title: '',
        date: '',
        text:'',
    },
    isFormReadyToSubmit: false,
    editMode: false,
};

export function formReducer(state, action) {
    switch (action.type) {
        case "RESET_VALIDITY": {
            return {...state, isValid: initialState.isValid };
        }
        case"CLEAR": {
            return {...state,   values:initialState.values, isFormReadyToSubmit: false,
                };
        }
        // case "EDIT":{
        //     return {...state, values: {...action.payload}};
        // }
        case "SUBMIT" : {
            const titleValidity = !!action.payload.title.trim();
            const dateValidity = !!action.payload.date;
            const textValidity = !!action.payload.text.trim();
            return {
                values: action.payload,
                isValid: {
                    title: titleValidity,
                    date: dateValidity,
                    text: textValidity
                },
                isFormReadyToSubmit: titleValidity && dateValidity && textValidity,
                editMode: initialState.editMode
            };

        }
        default: {
            return state;
        }
    }
}
