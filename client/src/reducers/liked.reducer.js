import { GET_LIKEDS } from "../actions/liked.actions";

const initialState = {};

export default function likedReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKEDS:
            return action.likedpayload;
        default:
            return state;
    }
}