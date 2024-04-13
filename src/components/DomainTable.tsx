import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "./Button";
import { domainData } from "../recoil/atom";
import CreateNewDomain from "../models/CreateNewDomain";
import { API } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DomainUpdate from "../models/DomainUpdate";
import axios from "axios";

export function DomainTable() {
    const table = useRecoilValue(domainData)

    return <div className="relative overflow-x-auto py-4 border-2">
        <div className="m-6 text-4xl">{"Domains Data"}</div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase  bg-gray-00 dark:text-gray-00 border-2">
                <tr>
                    <th scope="col" className="px-6 py-3 text-sm">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm">
                        Resource Record SetCount
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm">
                        <CreateNewDomain />
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    table.map((item) => {
                        return <TableBody id={item.id} name={item.name} description={item.description} resourceRecordSetCount={item.resourceRecordSetCount} />;
                    })
                }
            </tbody>
        </table>
    </div>
}

function TableBody(props: any) {
    const setTable = useSetRecoilState(domainData)
    const navigate = useNavigate()
    return <tr className="bg-white ">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
            {props.name}
        </th>
        <td className="px-6 py-4">
            {props.description}
        </td>
        <td className="px-6 py-4">
            {props.resourceRecordSetCount}
        </td>

        <td className="px-6 py-4">
            <div className="flex items-center space-x-4">
                <DomainUpdate Name={props.name} Description={props.description} Id={props.id} setTable={setTable} />
                <Button onClick={() => {

                    navigate(`/record/${props.id}`)
                }} label={"View Record"} />
                <Button onClick={async () => {
                    try {

                        const response = await toast.promise(
                            axios.delete(API + "/domain/" + props.id, {
                                headers: {
                                    "Authorization": localStorage.getItem("token"),
                                    "Content-Type": "application/json"
                                }
                            })
                            , {
                                pending: 'Deleting Domain...',
                                success: 'Domain Deleted Successfully',
                            }, { autoClose: 2000, pauseOnHover: false, }
                        )
                        setTable(response.data.domains)
                    } catch (err: any) {
                        if (!err.response.data.message) alert("Server Error");
                        alert(err.response.data.message)
                    }
                }} label={"Delete"} />
            </div>
        </td>

    </tr>
}