import { getUser as getUserData,
    logOutUser,
    updateUser as updateUserInfo
} from "../../Fetch/Users";

export const userLoggedIn = (user) => ({
    type: 'userLoggedIn',
    payload: { user }
});

export const getUser = () => {
    return (dispatch) => {
        getUserData().then(data => {
            dispatch(setUser(data))
        })
    }
};

const setUser = (user) => ({
    type: 'setUser',
    payload: { user }
})

export const logOut = (payload) => {
    return (dispatch) => {
        logOutUser().then(data => {
            dispatch(userLogOut())
        })
    }
};

const userLogOut = () => ({
    type: 'userLogOut'
})

export const updateProfile = (payload) => {
    return (dispatch) => {
        updateUserInfo(payload).then(data => {
            dispatch(userUpdate(data))
        })
    }
};

const userUpdate = (user) => ({
    type: 'userUpdate',
    payload: { user }
})
