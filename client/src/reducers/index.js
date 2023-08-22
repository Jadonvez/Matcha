import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import likerReducer from "./liker.reducer";
import likedReducer from "./liked.reducer";
import matchReducer from "./match.reducer"

export default combineReducers ({
    userReducer,
    likerReducer,
    likedReducer,
    matchReducer,
})