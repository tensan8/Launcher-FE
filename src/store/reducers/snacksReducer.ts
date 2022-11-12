import {ActionTemplate, SnackState} from '../../type'
import * as actionTypes from '../actionTypes'
import { SnackDTO } from "../../dtos/snackDTO";

const initialState: SnackState = {snackList: []}

const tableListReducer = (state: SnackState = initialState, action: ActionTemplate<SnackDTO[]>): SnackState => {
    console.log(action.data)
    switch (action.type) {
        case actionTypes.ALL_SNACKS:
            return {
                ...state,
                snackList: action.data
            }
        default:
            return {
                ...state
            }
    }
}

export default tableListReducer
