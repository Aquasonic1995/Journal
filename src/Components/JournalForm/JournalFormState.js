export const initialState = {
    isValid: {
        title: true,
        date: true,
        text: true
    },
    values: {
        title: undefined,
        date: undefined,
        text: undefined
    },
    isFormReadyToSubmit: false
};

export function formReducer(state, action) {
    switch (action.type) {
        case "RESET_VALIDITY": {
            return { ...state, isValid: initialState.isValid};
        }

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
                isFormReadyToSubmit: titleValidity && dateValidity && textValidity
            };
        }

    }
}
