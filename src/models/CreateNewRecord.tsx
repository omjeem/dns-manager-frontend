import { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { API } from "../utils";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";



export default function CreateNewRecord({ domainName, setRecord }: { domainName: any, setRecord: any }) {
    const [showModal, setShowModal] = useState(false);
    const [recordType, setRecordType] = useState("");
    const [recordValue, setRecordValue] = useState("");
    const { hostedZoneId } = useParams()



    const handleTypeChange = (event: any) => {
        const selectedType = event.target.value;
        const types: { [key: string]: string } = {
            A: ' 192.0.2.1',
            AAAA: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            CNAME: 'canonical.example.com',
            MX: "10 mail.example.com",
            NS: "ns1.example.com",
            PTR: "host.example.com",
            SOA: "ns1.example.com. hostmaster.example.com. 2011062001 16384 2048 1048576 2560",
            SRV: "_example._tcp.example.com. 3600 IN SRV 10 5 5060 server.example.com.",
            TXT: "text",
            DNSSEC: "dnssec"
        };
        const selectedTypeValue: string = types[selectedType] || '';
        setRecordType(selectedType);
        setRecordValue(selectedTypeValue);
    };




    return (
        <>
            <Button label="Create New Record" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <HeadingCustom label={"Create new Record"} />
                                    <SubHeadingCustom label={"Craft a Fresh Domain Record"} />

                                    <div >
                                        <div className="text-lg font-medium text-left py-2 ">
                                            Select Record Type
                                        </div>
                                        <select className="w-full px-2 py-1 border rounded border-slate-400" id="type" onChange={handleTypeChange}>
                                            <option value="">Select Record Type</option>
                                            <option value="A">A (Address) </option>
                                            <option value="AAAA">AAAA (IPv6 Address)</option>
                                            <option value="CNAME">CNAME (Canonical Name)</option>
                                            <option value="MX">MX (Mail Exchange) </option>
                                            <option value="NS">NS (Name Server) </option>
                                            <option value="PTR">PTR (Pointer)</option>
                                            <option value="SOA">SOA (Start of Authority)</option>
                                            <option value="SRV">SRV (Service) </option>
                                            <option value="DNSSEC">DNSSEC</option>

                                        </select>
                                    </div>
                                    <InputBoxCustom onChange={(e: any) => {
                                        setRecordValue(e.target.value)
                                    }} label={"Description"} value={recordValue} />

                                    <div className="pt-4 pb-2">
                                        <Button onClick={async () => {
                                            if (recordType === "" || recordValue === "") {
                                                alert("Please fill all the fields")
                                                return
                                            }
                                            try {
                                                
                                                const response:any = await toast.promise(
                                                    axios.post(API + "/record/create/" + hostedZoneId, {
                                                        Name: domainName,
                                                        Type: recordType,
                                                        TTL: 300,
                                                        ResourceRecords: [
                                                            {
                                                                Value: recordValue
                                                            }
                                                        ]
                                                    }, {
                                                        headers: {
                                                            Authorization: localStorage.getItem("token"),
                                                            "Content-Type": "application/json"
                                                        }
                                                    }),{
                                                         pending : "Creating Record...",
                                                         success : "Record Created Successfully"
                                                    },{
                                                        autoClose: 2000, pauseOnHover: false
                                                    }
                                                )
                                                setRecord(response.data.ResourceRecordSets)
                                                setRecordValue("")
                                                setShowModal(false)

                                            } catch (err:any) {
                                                if(!err.response.data.message)alert("Server Error");
                                                console.log(err)
                                                setRecordValue("")
                                                setShowModal(false)
                                                
                                                alert(err.response.data.message)
                                                
                                            }

                                        }}
                                            label={"Create"} />
                                        <Button onClick={() => {
                                            setRecordValue("")
                                            setShowModal(false)
                                        }} label={"Cancel"} />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}


function HeadingCustom({ label }: any) {
    return <div className="font-bold text-3xl pt-6">
        {label}
    </div>
}

function SubHeadingCustom({ label }: any) {
    return <div className="text-slate-500 text-xs  pt-1 px-4 pb-4">
        {label}
    </div>
}

function InputBoxCustom({ label, placeholder, onChange: onChange, value }: any) {
    return <div>
        <div className="text-lg font-medium text-left py-2 ">
            {label}
        </div>
        <input onChange={onChange} value={value} placeholder={placeholder} className=" w-full px-2 py-1 border rounded border-slate-400" />
    </div>
}