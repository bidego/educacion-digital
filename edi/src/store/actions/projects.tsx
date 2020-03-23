import Project from '../../models/project';

export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';

export const fetchProjects = () => {
    return async (dispatch:any,getState:any) => {
        let { userId } = getState().auth;
        try {
            const response = await fetch('https://rn-shop-app-80b0f.firebaseio.com/projects.json')
            if(!response.ok) {
                throw new Error("Something went wrong");
            }
            const responseData = await response.json();
            
            const projects:any = [];
            Object.keys(responseData).forEach( key => {
                projects.push(new Project(
                    key,
                    responseData[key].ownerId,
                    responseData[key].title,
                    responseData[key].imageUrl,
                    responseData[key].description,
                    responseData[key].price));
            })
    
            dispatch({
                type:SET_PROJECT,
                projects: projects,
                userProjects: projects.filter((prod:any) => prod.ownerId === userId)
            });
        } catch (error) {
            throw error;
        }
    };
};
export const deleteProject = (projectId:any) => {
    return async (dispatch:any) => {
        let response = await fetch(
            `https://rn-shop-app-80b0f.firebaseio.com/products/${projectId}.json`,
            {
                method: 'DELETE'
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        dispatch({ type: DELETE_PROJECT, pid: projectId });
    };
}
export const updateProject = (id:any,title:any,description:any,imageUrl:any) => {
    return async (dispatch:any,getState:any) =>  {
        let { token } = getState().auth;
        let { userProjects } = getState().projects;
        let { price } = userProjects.find((proj:any)=>proj.id===id);
        try {
            let response = await fetch(`https://rn-shop-app-80b0f.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title,description,imageUrl})
            })
            console.log('updating');
            console.log(JSON.stringify({
                id,title, description,imageUrl,price}));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            dispatch({
                type: UPDATE_PROJECT,
                id: id,
                projectData: {
                    title: title,
                    description: description,
                    imageUrl: imageUrl
                }
            });
        } catch(error) {
            throw new Error("No se pudo editar: " + error.message);
        }
    }
}
export const createProject = (title:any,description:any,imageUrl:any,price:any) => {
    return async (dispatch:any, getState:any) => {
        let { token, userId:ownerId } = getState().auth;
        console.log(token);
        //async code
        let projectData = {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            ownerId: ownerId
        };
 
        const response = await fetch(`https://rn-shop-app-80b0f.firebaseio.com/projects.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,description,imageUrl,price, ownerId})
        })
        const responseData = await response.json();
        
        console.log("POST firebase: ");
        console.log(responseData);

        dispatch({
            type: CREATE_PROJECT,
            projectData: { id: responseData.name, ...projectData }
        });
    };
}
