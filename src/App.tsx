import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { Main } from "./components/Main"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { FirstPage } from "./components/FirstPage"
import { RecoilRoot } from "recoil"
import { Record } from "./components/Record";
import { Docs } from "./Docs";


function App() {

  return (
    <div>

      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/record/:hostedZoneId" element={<Record />} />
            <Route path="/docs" element={<Docs />} />

          </Routes>
        </RecoilRoot>
      </BrowserRouter>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>
  )
}

export default App
