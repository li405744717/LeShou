import { SHOW_DATEPICKER, DELETE_INVOICE, SELECT_INVOICE } from '../actions/actionTypes';

//charge-apply
const chargeApplyState = {
    dataPickerVisible: false,
    invoice: {}
}
export const chargeApply = (state = chargeApplyState, action) => {
    switch (action.type) {
        case SHOW_DATEPICKER:
            return { ...state, dataPickerVisible: action.visible };
        case SELECT_INVOICE:
            return { ...state, invoice: action.invoice };
        case DELETE_INVOICE:
            return { ...state, invoice: {} }
        default:
            return state;
    }
}

