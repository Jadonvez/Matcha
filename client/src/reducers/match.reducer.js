import { GET_MATCHS } from "../actions/match.actions";
import { CREATE_MATCH } from "../actions/match.actions";
import { DELETE_MATCH } from "../actions/match.actions";
import { CHECK_MATCH } from "../actions/match.actions";

const initialState = {};

export default function matchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MATCHS:
            return action.payload;
        case CHECK_MATCH:
            return {
                ...state,
                data: action.payload,
            }
        case CREATE_MATCH:
            return {
                ...state
            }
        case DELETE_MATCH:
             return {
                ...state
            }
        default:
            return state;
    }
}