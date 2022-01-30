import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {
    const history = useHistory();

    const [user, setUser] = useState({})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/getloggedinuser", {withCredentials:true})
            .then(res=>{
                console.log("res ", res)
                setUser(res.data.results)
            })
            .catch(err=>{
                console.log("err", err)
                history.push("/")
            })
    },[])

    const logout = ()=>{
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(res=>{
                console.log("res logging out", res)
            })
            .catch(err=>console.log("err logging out", err))
            history.push("/")
    }
    return (
        <div>
            <button onClick={logout} className='btn btn-danger'>Sign Out</button>
            <h1>Welcome to Finance Tracker, {user.firstName}</h1>
            <p>Get rich or die tracking (your finances that is!)</p>
        </div>
    );
};

export default Dashboard;