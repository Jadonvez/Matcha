import axios from "axios";

export const GET_MATCHS = "GET_MATCHS";
export const CREATE_MATCH = "CREATE_MATCH";
export const DELETE_MATCH = "DELETE_MATCH";
export const CHECK_MATCH = "CHECK_MATCH";

export const getMatchs = (uid) => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5001/api/user/getmatchs/${uid}`)
            .then((res) => {
                dispatch({ type: GET_MATCHS, payload: res.data })
            })
            .catch((err) => console.log(err));
    };
};

export const checkMatch = (uid1, uid2) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `http://localhost:5001/api/user/checkmatch/${uid1}/${uid2}`,
            data: { uid1, uid2 }
        })
            .then((res) => {
                dispatch({ type: CHECK_MATCH, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const createMatch = (likerUid, likedUid) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `http://localhost:5001/api/user/creatematch`,
            data: { likerUid, likedUid }
        })
            .then((res) => {
                dispatch({ type: CREATE_MATCH })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteMatch = (likerUid, likedUid) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `http://localhost:5001/api/user/deletematch`,
            data: { likerUid, likedUid }
        })
            .then((res) => {
                dispatch({ type: DELETE_MATCH })
            })
            .catch((err) => console.log(err))
    }
}