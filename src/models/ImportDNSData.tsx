import axios from "axios";
import React, { useState } from "react";
import { API } from "../utils";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { toast } from "react-toastify";

interface CSVRow {
    [key: string]: string;
}

export function ImportDNSData({ setRecord }: { setRecord: any }) {
    const [file, setFile] = useState<File | null>(null);
    const [array, setArray] = useState<CSVRow[]>([]);
    const { hostedZoneId } = useParams()


    const fileReader = new FileReader();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const csvFileToArray = (string: string) => {
        const csvRows = string.trim().split("\n");

        const csvHeader = csvRows.shift()?.split(",").map(header => header.trim()) as string[];

        const newArray = csvRows.map(row => {
            const values = row.split(",");
            const obj: Record<string, string> = {};
            values.forEach((value, index) => {
                obj[csvHeader[index]] = value.trim().replace(/^"|"$/g, ''); // Remove leading and trailing quotes
            });
            return obj;
        });

        setArray(newArray);
    };


    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = async function (event) {
                if (event.target) {
                    const text = event.target.result as string;
                    csvFileToArray(text);
                }
            };

            fileReader.readAsText(file);
        }
    };


    return (
        <div >

            <form >
                <div className="space-y-2">

                    <div>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <Button onClick={async (e: any) => {
                            handleOnSubmit(e)
                            if (file === null) return alert("Please select a file")
                            const jsonData = JSON.stringify(array);

                            try {
                                const response = await toast.promise(axios.post(API + "/record/bulk/" + hostedZoneId, {
                                    jsonData
                                }, {
                                    headers: {
                                        "Authorization": localStorage.getItem("token"),
                                        "Content-Type": "application/json",
                                    },
                                }), {
                                    pending: "Importing Data...",
                                    success: "Data Imported Successfully"
                                }, {
                                    autoClose: 2000, pauseOnHover: false
                                })
                                setRecord(response.data.ResourceRecordSets)
                            } catch (err: any) {
                                if (!err.response.data.message) alert("Server Error");
                                alert(err.response.data.message)
                            }


                        }} label={"Import"}></Button>

                    </div>

                </div>



            </form>


        </div>
    );
}
