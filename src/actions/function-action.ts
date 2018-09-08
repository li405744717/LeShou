import { SHOW_DATEPICKER, SELECT_INVOICE, DELETE_INVOICE } from './actionTypes';

//charge-apply
const show_datepicker = (visible) => {
    return {
        type: SHOW_DATEPICKER,
        visible: visible
    }
}
const select_inovice = (invoice) => {
    return {
        type: SELECT_INVOICE,
        invoice: invoice
    }
}
const delete_invoice = () => {
    return {
        type: DELETE_INVOICE,
    }
}





export default {
    charge_apply: {
        show_datepicker,
        select_inovice,
        delete_invoice
    }
}