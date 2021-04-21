import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import {userContext} from '../App'

const Logout = () => {
    const {state,dispatch} = useContext(userContext)
    const history = useHistory()
    useEffect(() => {
        fetch("http://localhost:8000/logout",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then(()=>{
            history.push('/login')
            dispatch({type:"USER",payload:false})}
        ).catch((err)=>{console.log(err);})
    }, [])
    return (
        <div>
            <h1>🚀</h1>
        </div>
    )
}

export default Logout
