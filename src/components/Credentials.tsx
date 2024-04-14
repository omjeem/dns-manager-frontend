import { useState } from "react";
import { Button } from "./Button";
import { Heading, InputBox, SubHeading } from "./SubComponents";
import axios from "axios";
import { API } from "../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function Credentails() {
  const [isSignUp, setSugnUp] = useState(true)
  const navigate = useNavigate()


  return <div>
    {
      (isSignUp ? <SignUpModel setSignUp={setSugnUp} useNavigate={navigate} /> : <SignInModel setSignUp={setSugnUp} useNavigate={navigate} />)
    }
  </div>
}
function SignInModel(props: any) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return <div>

    <div className="relative w-auto my-6">
      {/*content*/}
      <div className="text-center p-4 h-max px-4 ">
        <Heading label={"SignIn to  Your Account"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e: any) => {
          setEmail(e.target.value)
        }} placeholder="ex : john_doe" label={"Email"} />


        <InputBox onChange={(e: any) => {
          setPassword(e.target.value)
        }} placeholder="ex : john@example.com" label={"Password"} />


        <div className="pt-4 pb-2">
          <Button label={"SignIn"} onClick={async () => {
            if (email === "" || password === "") {
              alert("Please fill all the details")
              return
            }
            try {
              const response: any = await toast.promise(
                axios.post(API + "/user/signin", {
                  email: email,
                  password: password
                }),
                {
                  pending: "Loading... ⏳ Please be patient as we process your request. It may take a few moments.",
                  success: 'Signed Up Successfull! 🎉',
                }
                , { autoClose: 2000, pauseOnHover: false, });
              localStorage.setItem("token", response.data.token)
              navigate("/main")
            } catch (err: any) {
              const statusCode = err.response.status;
              if (statusCode === 403) toast.error("Wrong Body")
              else if (statusCode === 404) toast.error("User not found / Invalid Credentials")
              else toast.error("Server Error")
            }

          }} />
        </div>
        <div onClick={() => {
          props.setSignUp(true)
        }} className="text-sm flex justify-center cursor-pointer ">
          Don't have an Account?&nbsp;<b> SignUp</b>

        </div>

      </div>
    </div>
  </div>
}

function SignUpModel(props: any) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [awsKey, setAwsKey] = useState("")
  const [awsSecret, setAwsSecret] = useState("")
  const [awsRegion, setAwsRegion] = useState("")

  const navigate = useNavigate()


  return <div>

    <div className="relative w-auto my-6">
      {/*content*/}
      <div className="text-center p-4 h-max px-4 ">
        <Heading label={"Create Your Account"} />

        <SubHeading label={"Enter your information to create an account"} />

        <InputBox onChange={(e: any) => {
          setUsername(e.target.value)
        }} placeholder="ex : john_doe" label={"Username"} />

        <InputBox onChange={(e: any) => {
          setEmail(e.target.value)
        }} placeholder="ex : john@example.com" label={"Email"} />

        <InputBox onChange={(e: any) => {
          setPassword(e.target.value)
        }} placeholder="ex : p@ssw0rd" label={"Password"} />

        <InputBox onChange={(e: any) => {
          setAwsKey(e.target.value)
        }} placeholder="ex : AKIAIOSFODNN7EXAMPLE " label={"AWS ACCESS KEY ID"} />

        <InputBox onChange={(e: any) => {
          setAwsSecret(e.target.value)
        }} placeholder="ex : wJalrXUtnFEMI/K7MDENbPxRfiCYEXAMPLEKEY " label={"AWS SECRET ACCESS KEY"} />

        <InputBox onChange={(e: any) => {
          setAwsRegion(e.target.value)
        }} placeholder="ex : us-west-2" label={"AWS Region"} />

        <div className="pt-4 pb-2">
          <Button label={"SignUp"} onClick={async () => {
            if (username === "" || password === "" || email === "" || awsKey === "" || awsSecret === "" || awsRegion === "") {
              alert("Please enter all the details");
              return;
            }
            try {
             
              const response: any = await toast.promise(
                axios.post(API + "/user/signup", {
                  username, password, email, awsKey, awsSecret, awsRegion
                }),
                {
                  pending: "Loading... ⏳ Please be patient as we process your request. It may take a few moments.",
                  success: 'Signed Up Successfull! 🎉',
                }
                , { autoClose: 2000, pauseOnHover: false, });
              localStorage.setItem("token", response.data.token)
              navigate("/main")
            } catch (err : any) {
              const statusCode = err.response.status;
              if (statusCode === 403) alert("Invalid AWS Credentials")
              else if (statusCode === 404) toast.error("Email already exists")
              else toast.error("Server Error")
            }

          }} />
        </div>

        <div onClick={() => {
          props.setSignUp(false)
        }} className="text-sm flex justify-center cursor-pointer ">
          Already have Account?&nbsp;<b>Login</b>
        </div>

      </div>
    </div>
  </div>
}
