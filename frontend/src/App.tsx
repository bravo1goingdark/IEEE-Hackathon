import { FunctionComponent } from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import LandingPage from "./components/LandingPage";
import CarbonFootprintForm from "./components/CarbonFootprintForm";


export const App : FunctionComponent = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {<LandingPage />} />
            <Route path="/carbon" element = {<CarbonFootprintForm/>} />
          </Routes>
        </BrowserRouter>
    )
}