import {  useSetRecoilState } from "recoil";
import { domainData } from "../recoil/atom";
import { AppBar } from "./AppBar";
import { DomainTable } from "./DomainTable";
import { useEffect } from "react";
import { API } from "../utils";
import axios from "axios";

export function Main() {
    const setTable = useSetRecoilState(domainData);

    useEffect(() => {
        axios.get(API + "/domain", {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then((res:any) => {
            setTable(res.data.domains)
        }).catch((err:any) => {
            console.log(err)
        })
    }, [])

    return <div>
        <AppBar />
        <DomainTable />
    </div>
}


