import {
    getTopics as getTopicsData,
    topicLike,
    topicAdd,
    topicDelete
} from "../../Fetch/Topics";
import {
    getProjects as getProjectsData,
    projectLike
} from "../../Fetch/Projects";
import { getTeams as getTeamsData } from "../../Fetch/Teams";


export const getTopics = () => {
    return (dispatch) => {
        getTopicsData().then(data => {
            dispatch(setTopics(data))
        })
    }
};

const setTopics = (topics) => ({
    type: 'setTopics',
    payload: { topics }
})

export const getProjects = () => {
    return (dispatch) => {
        getProjectsData().then(data => {
            dispatch(setProjects(data))
        })
    }
};

const setProjects = (projects) => ({
    type: 'setProjects',
    payload: { projects }
})

export const getTeams = () => {
    return (dispatch) => {
        getTeamsData().then(data => {
            dispatch(setTeams(data))
        })
    }
};

const setTeams = (teams) => ({
    type: 'setTeams',
    payload: { teams }
})

export const likeTopic = (payload) => {
    return (dispatch) => {
        topicLike(payload).then(data => {
            dispatch(setTopic(data))
        })
    }
};

const setProject = (project) => ({
    type: 'setProject',
    payload: { project }
})

export const likeProject = (payload) => {
    return (dispatch) => {
        projectLike(payload).then(data => {
            dispatch(setProject(data))
        })
    }
};

const setTopic = (topic) => ({
    type: 'setTopic',
    payload: { topic }
})

export const addTopic = (payload) => {
    return (dispatch) => {
        topicAdd(payload).then(data => {
            dispatch(setTopic(data))
        })
    }
};


export const deleteTopic = (payload) => {
    return (dispatch) => {
        topicDelete(payload).then(data => {
            dispatch(removeTopic(payload.topic))
        })
    }
};

const removeTopic = (topic) => ({
    type: 'deleteTopic',
    payload: { topic }
})
