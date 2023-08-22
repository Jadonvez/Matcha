import axios from "axios";

export const GET_LIKEDS = "GET_LIKEDS";

export const getLikeds = (uid) => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5000/api/user/getliked/${uid}`)
            .then((res) => {
                dispatch({ type: GET_LIKEDS, likedpayload: res.data })
            })
            .catch((err) => console.log(err));
    };
};