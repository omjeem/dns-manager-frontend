import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

export function FirstPage() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/home")
        }
        axios.get(API + "/user", {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        }).then(() => {
            navigate("/main")
        }).catch(() => {
            navigate("/home")
        })
    }, [navigate])

    return <div className="flex justify-center items-center h-full pb-40">
        <div className="text-center items-center pt-48">
            <h2 className="text-3xl font-bold mb-2">Thank you for your patience as we retrieve your details.<br></br> Our backend operates on a serverless cloud provider,<br></br> which may require additional time for the initial server activation.</h2>
        </div>
    </div>

}