import { SubmitButton } from "../components/SubmitButton"
import { useNavigate } from "react-router-dom" 

export function Dashboard (){
    const navigate = useNavigate()

    return(
        <>
        <div>
            <SubmitButton buttonText="Account" onClick={()=>{
                navigate("/user")
            }} />
        </div>
        </>
    )
}