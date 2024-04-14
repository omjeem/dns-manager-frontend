import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utils";

export function AppBar() {
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
       axios.get(API+"/user",{
              headers:{
                "Authorization":localStorage.getItem("token"),
                "Content-Type":"application/json"
              }
         }).then((response : any)=>{
              setUsername(response.data.username)
         }).catch((err:any)=>{
              console.log("Error is ",err)
       })
    },[])

    return <div className="rounded-lg bg-white  p-4 border-2 ">
        <div className="flex justify-between items-center">
            <div className="text-2xl font-bold ms-2">DNS Master</div>
            <div className="flex items-center">
                <div className="text-sm mx-3">Hello, {username}</div>
                <div>
                    <Button onClick={() => {
                        const confirmLogout = window.confirm("Are you sure you want to logout?");
                        if (confirmLogout) {
                            localStorage.removeItem("token");
                            toast.success("Logged Out Successfully")
                            navigate("/");
                        }
                    }} label={"LogOut"} />
                </div>
            </div>
        </div>
    </div>
}