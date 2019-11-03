import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export const auth = (email: string, password: string, isLogin: boolean) => {
  return async (dispatch: Function) => {
    const authData = {
      email, password,
      returnSecureToken: true
    }
    
    let url: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_SIGN_UP_KEY}`
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_SIGN_IN_KEY}`
    }
    const response = await axios.post(url, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    
    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userID', data.localId)
    // @ts-ignore
    localStorage.setItem('expirationDate', expirationDate)
    
    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export const autoLogout = (time: any) => {
  return (dispatch: Function) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export const autoLogin = () => {
  return (dispatch: Function) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      // @ts-ignore
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userID')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export const authSuccess = (token: string) => {
  return {
    type: AUTH_SUCCESS,
    token
  }
}