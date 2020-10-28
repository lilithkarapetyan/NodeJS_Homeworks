const dataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'setTopics':
            state = setTopics(state, action)
            break;
        case 'setProjects':
            state = setProjects(state, action)
            break;
        case 'setTeams':
            state = setTeams(state, action)
            break;
        case 'setTopic':
            state = setTopic(state, action)
            break;
        case 'deleteTopic':
            state = deleteTopic(state, action)
            break;
        case 'setProject':
            state = setProject(state, action)
            break;
        default:
            break;
    }
    return state;
}

const setTopics = (state, action) => ({
    ...state,
    topics: action.payload.topics
});

const setProjects = (state, action) => ({
    ...state,
    projects: action.payload.projects
});

const setTeams = (state, action) => ({
    ...state,
    teams: action.payload.teams
});

const setTopic = (state, action) => {
    const { topic } = action.payload;
    const i = state.topics.findIndex(t => t.id === topic.id);
    let newState = {}
    if (i >= 0) {
        newState = {
            ...state,
            topics: [...state.topics.slice(0, i), topic, ...state.topics.slice(i + 1, state.topics.length)]
        }
    }
    else {
        newState = {
            ...state,
            topics: [...state.topics, topic]
        }
    }

    return newState
};

const setProject = (state, action) => {
    const { project } = action.payload;
    const i = state.projects.findIndex(p => p.id === project.id);
    let newState = {}
    if (i >= 0) {
        newState = {
            ...state,
            projects: [...state.projects.slice(0, i), project, ...state.projects.slice(i + 1, state.projects.length)]
        }
    }
    else {
        newState = {
            ...state,
            projects: [...state.projects, project]
        }
    }

    return newState
};

const deleteTopic = (state, action) => {
    const { topic } = action.payload;
    const i = state.topics.findIndex(t => t.id === topic.id);
    const newState = {
        ...state,
        topics: [...state.topics.slice(0, i), ...state.topics.slice(i + 1, state.topics.length)]
    }
    return newState
};
export default dataReducer;