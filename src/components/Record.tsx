import { AppBar } from "./AppBar";
import { API } from "../utils";
import axios from "axios";
import { Button } from "./Button";
import { toast } from "react-toastify";
import CreateNewRecord from "../models/CreateNewRecord";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateRecord from "../models/UpdateRecord";
import { ImportDNSData } from "../models/ImportDNSData";


interface ResourceRecordType {
    Value: String
}
interface Record {
    Name: String,
    Type: String,
    TTL: String,
    ResourceRecords: ResourceRecordType[]
}


export function Record() {
    return <div>
        <AppBar />
        <RecordTable />
    </div>
}


function RecordTable() {

    const { hostedZoneId } = useParams()
    const [record, setRecord] = useState([])

    useEffect(() => {
        axios.get(API + "/record/" + hostedZoneId, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then((response: any) => {
            setRecord(response.data.ResourceRecordSets)

        }).catch((err: any) => {
            console.log("Error is ", err)
        })
    }, [])

    return <div className="relative overflow-x-auto py-4 border-2">
        <div className="m-6 space-y-2 lg:flex justify-between">
            <div className=" text-4xl">{record.length !== 0 ? (record[0] as Record).Name : "sample.com"}</div>
            <div className="flex lg:justify-center items-center">
              <ImportDNSData setRecord={setRecord}/>
            </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-2">
                <tr>
                    <th scope="col" className="px-6 py-3 text-sm">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm">
                        TTL
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm">
                        Resource Records
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm">
                        <div className="space-y-2">
                            <CreateNewRecord domainName={record.length !== 0 ? (record[0] as Record).Name : "sample.com"} setRecord={setRecord} />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    record.length != 0 ? record.map((item: Record) => {
                        return <TableBody Name={item.Name} Type={item.Type} TTL={item.TTL} ResourceRecords={item.ResourceRecords} setRecord={setRecord} />;
                    }) : <DummyTableBody />
                }
            </tbody>
        </table>
    </div>
}

function TableBody(props: any) {

    const { hostedZoneId } = useParams()

    return <tr className="bg-white">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
            {props.Type}
        </th>
        <td className="px-6 py-4">
            {props.TTL}
        </td>
        <td className="px-6 py-4">
            {props.ResourceRecords.map((item: ResourceRecordType) => {
                return <div className="max-w-[200px]">{item.Value}</div>
            })}
        </td>

        <td className="px-6 py-4">
            <div className="flex items-center space-x-4">
                <UpdateRecord {...props} />
                <Button onClick={async () => {
                    try {

                        const response = await toast.promise(
                            axios.post(API + "/record/delete/" + hostedZoneId, {
                                Name: props.Name,
                                Type: props.Type,
                                TTL: props.TTL,
                                ResourceRecords: props.ResourceRecords.map((item: ResourceRecordType) => {
                                    return { Value: item.Value }
                                })
                            }, {
                                headers: {
                                    "Authorization": localStorage.getItem("token"),
                                    "Content-Type": "application/json"
                                },

                            }), {
                            pending: 'Deleting Record...',
                            success: 'Record Deleted Successfully',
                        }, {
                            autoClose: 2000, pauseOnHover: false,
                        }
                        )
                        props.setRecord(response.data.ResourceRecordSets);
                    } catch (err: any) {
                        if (!err.response.data.message) alert("Server Error");
                        alert(err.response.data.message)
                    }

                }} label={"Delete"} />
            </div>
        </td>

    </tr>
}

function DummyTableBody() {
    return <tr className="bg-white">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
            sample
        </th>
        <td className="px-6 py-4">
            sample
        </td>
        <td className="px-6 py-4">
            sample
        </td>
    </tr>
}



