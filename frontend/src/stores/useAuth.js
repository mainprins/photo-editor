import {create} from "zustand"

export const useAuth = create((set)=>({
    authUser: null,
    isAuthenticated: localStorage.getItem('auth'),
}))