
export function Heading({ label }: any) {
    return <div className="font-bold text-5xl pt-6">
        {label}
    </div>
}

export function SubHeading({ label }: any) {
    return <div className="text-slate-500 text-lg pt-1 px-4 pb-4">
        {label}
    </div>
}

export function InputBox({ label, placeholder, onChange: onChange, value }: any) {
    return <div>
        <div className="text-lg font-medium text-left py-2 ">
            {label}
        </div>
        <input onChange={onChange} value={value} placeholder={placeholder} className=" w-full px-2 py-1 border rounded border-slate-400" />
    </div>
}


