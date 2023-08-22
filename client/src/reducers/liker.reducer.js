import { GET_LIKERS } from "../actions/liker.actions";

const initialState = {};

export default function likerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKERS:
            return action.payload;
        default:
            return state;
    }
}