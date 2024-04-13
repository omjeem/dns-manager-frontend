import { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { API } from "../utils";
import { useSetRecoilState } from "recoil";
import { domainData } from "../recoil/atom";
import { toast } from "react-toastify";



export default function CreateNewDomain() {
    const [showModal, setShowModal] = useState(false);
    const [domainName, setDomainName] = useState("");
    const [description, setDescription] = useState("");
    const setDomain = useSetRecoilState(domainData)


    return (
        <>
            <Button label="Create New Domain" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <HeadingCustom label={"Create new Domain"} />
                                    <SubHeadingCustom label={"Design your digital oasis: Start building your domain"} />
                                    <InputBoxCustom onChange={(e: any) => {
                                        setDomainName(e.target.value)
                                    }} placeholder="ex : example.com" label={"Domain Name"} />

                                    <InputBoxCustom onChange={(e: any) => {
                                        setDescription(e.target.value)
                                    }} placeholder="ex: building example" label={"Description"} />

                                    <div className="pt-4 pb-2">
                                        <Button onClick={async () => {
                                            if (domainName === "" || description === "") {
                                                alert("Please fill all the fields")
                                                return
                                            }
                                            try {
                                                
                                                const response = await toast.promise(
                                                    axios.post(API + "/domain", {
                                                        domainName,
                                                        description
                                                    }, {
                                                        headers: {
                                                            "Authorization": localStorage.getItem("token"),
                                                            "Content-Type": "application/json"
                                                        }
                                                    }),{
                                                    pending: 'Creating Domain...',
                                                    success : 'Domain Created Successfully',
                                                    },{ autoClose: 2000, pauseOnHover: false, }
                                                )
                                                setDomain(response.data.domains)
                                                setShowModal(false)
                                            } catch (err:any) {
                                                if(!err.response.data.message)alert("Server Error");
                                                console.log(err)
                                                setShowModal(false)
                                                alert(err.response.data.message)
                                                
                                            }



                                        }}
                                            label={"Create"} />
                                        <Button onClick={() => {
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