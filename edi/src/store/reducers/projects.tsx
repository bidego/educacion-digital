import { DELETE_PROJECT, UPDATE_PROJECT, CREATE_PROJECT, SET_PROJECT } from '../actions/projects';
import Project from '../../models/project';

const initialState:any = {
    availableProjects: [],
    userProjects: []
}

export default (state = initialState, action:any) => {
    switch(action.type) {
        case SET_PROJECT:
            return {
                ...state,
                availableProjects: action.projects,
                userProjects: action.userProjects
            }
        case UPDATE_PROJECT:
            const pIndex = state.userProjects.findIndex((prod:any) => prod.id == action.id)
            const updateProject = new Project(
                action.projectData.id,
                state.userProjects[pIndex].ownerId,
                action.projectData.title,
                action.projectData.imageUrl,
                action.projectData.description,
                action.projectData.price
            )
            const updateUserProjects = [...state.userProjects];
            updateUserProjects[pIndex] = updateProject;
            
            const avProdIndex = state.availableProjects.findIndex((prod:any) => prod.id == action.id)
            const updateAvailableProjects = [...state.availableProjects];
            updateAvailableProjects[avProdIndex] = updateProject;
            return {
                ...state,
                availableProjects: updateAvailableProjects,
                userProjects: updateUserProjects
            }
        case CREATE_PROJECT:
            const newProject = new Project(
                action.projectData.id, 
                action.projectData.ownerId,
                action.projectData.title,
                action.projectData.imageUrl,
                action.projectData.description,
                action.projectData.price
            );
            return {
                ...state,
                availableProjects: state.availableProjects.concat(newProject),
                userProjects: state.userProjects.concat(newProject)
            }
        case DELETE_PROJECT: 
            return {
                ...state,
                userProjects: state.userProjects.filter((project:any) => project.id != action.pid),
                availableProjects: state.availableProjects.filter((p:any) => p.id != action.pid)
            }
    }
    return state;
}