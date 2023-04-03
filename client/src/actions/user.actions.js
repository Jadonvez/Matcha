import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME";
export const UPDATE_MAIL = "UPDATE_MAIL";
export const UPDATE_GENDER = "UPDATE_GENDER";
export const UPDATE_ORIENTATION = "UPDATE_ORIENTATION";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`http://localhost:5000/api/user/uid/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, uid) => {
    return (dispatch) => {
        return axios
        .post(`http://localhost:5000/api/user/upload`, data)
        .then((res) => {
            return axios
            .get(`http://localhost:5000/api/user/uid/${uid}`)
            .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        })
        .catch((err) => console.log(err));
    };
};

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload:bio })
            })
            .catch((err) => console.log(err))
    }
}

export const updateName = (userId, name) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/user/change_name/` + userId,
            data: { name }
        })
            .then((res) => {
                dispatch({ type: UPDATE_NAME, payload:name })
            })
            .catch((err) => console.log(err))
    }
}

export const updateFirstname = (userId, firstname) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/user/change_firstname/` + userId,
            data: { firstname }
        })
            .then((res) => {
                dispatch({ type: UPDATE_FIRSTNAME, payload:firstname })
            })
            .catch((err) => console.log(err))
    }
}

export const updateMail = (userId, mail) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/user/change_mail/` + userId,
            data: { mail }
        })
            .then((res) => {
                dispatch({ type: UPDATE_MAIL, payload:mail })
            })
            .catch((err) => console.log(err))
    }
}

export const updateGender = (userId, gender) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/user/change_gender/` + userId,
            data: { gender }
        })
            .then((res) => {
                dispatch({ type: UPDATE_GENDER, payload:gender })
            })
            .catch((err) => console.log(err))
    }
}

export const updateOrientation = (userId, orientation) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:5000/api/user/change_orientation/` + userId,
            data: { orientation }
        })
            .then((res) => {
                dispatch({ type: UPDATE_ORIENTATION, payload:orientation })
            })
            .catch((err) => console.log(err))
    }
}