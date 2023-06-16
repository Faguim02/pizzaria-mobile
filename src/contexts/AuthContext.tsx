import React, { createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextData = {
    user:UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignProps)=> Promise<void>
    loadingAuth: boolean
    loading: boolean
    signOut: ()=> Promise<void>
}
type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string
}

type AuthProvideProps = {
    children: ReactNode
}

type SignProps = {
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProvideProps ){
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)


    const isAuthenticated = !!user.name

    useEffect(()=>{
        async function getUser(){
            
            const userInfo = await AsyncStorage.getItem('@sejeitopizza')
            let hasUser: UserProps = JSON.parse(userInfo || '{}')
            
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }
            setLoading(false)
        }
        getUser()
    },[])

    async function signIn({email, password}:SignProps){
        setLoadingAuth(true)
        try{
            const response = await api.post('session', {
                email,
                password
            })

            const { id, name, token } = response.data
            const data = {
                ...response.data
            }

            AsyncStorage.setItem('@sejeitopizza', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token
            })

            setLoadingAuth(false)

        }catch(err){
            console.log("Error: "+err)
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(()=>{
            setUser({
                id:"",
                name:"",
                email:"",
                token:""
            })
        })
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, loading, loadingAuth, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}