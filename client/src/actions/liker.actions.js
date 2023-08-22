import axios from "axios";

export const GET_LIKERS = "GET_LIKERS";

export const getLikers = (uid) => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5000/api/user/getliker/${uid}`)
            .then((res) => {
                dispatch({ type: GET_LIKERS, payload: res.data })
            })
            .catch((err) => console.log(err));
    };
};