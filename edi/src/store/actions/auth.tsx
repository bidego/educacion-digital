import { decode } from 'base-64';

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId:any, token:any) => {
    return {
        type: AUTHENTICATE, userId: userId, token: token
    };
}

if (!window.atob) {
    window.atob = decode;
}
let key:any = process.env.REACT_APP_FIREBASE_KEY;
const FIREBASE_KEY = atob(key.toString());

export const signUp = (email:any,password:any) => {
    return async (dispatch:any) => {
        console.log(email)
        console.log(password)
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        
        if (!response.ok) {
            const resError = await response.json();
            let { message } = resError.error;
            throw new Error(message);            
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId,resData.idToken));
        let expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveStorageData(resData.idToken,resData.localId, expirationDate);
    };
};

export const login = (email:any,password:any) => {
    console.log(FIREBASE_KEY);
    return async (dispatch:any) => {
        console.log(email)
        console.log(password)
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        
        if (!response.ok) {
            const resError = await response.json();
            let { message } = resError.error;
            throw new Error(message);            
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.token));
        let expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveStorageData(resData.idToken,resData.localId, expirationDate);
    };
};

const saveStorageData = (token:any,userId:any,expirationDate:any) => {
    sessionStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate
    }));
}