import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE, UPDATE_NAME, UPDATE_FIRSTNAME, UPDATE_MAIL, UPDATE_GENDER, UPDATE_ORIENTATION } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            }
        case UPDATE_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case UPDATE_FIRSTNAME:
            return {
                ...state,
                firstname: action.payload,
            }
        case UPDATE_MAIL:
            return {
                ...state,
                mail: action.payload,
            }
        case UPDATE_GENDER:
            return {
                ...state,
                gender: action.payload,
        }
        case UPDATE_ORIENTATION:
            return {
                ...state,
                orientation: action.payload,
            }
        default:
            return state;
    }
}