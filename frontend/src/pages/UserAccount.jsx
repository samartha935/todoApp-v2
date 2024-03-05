import { SubmitButton } from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export function UserAccount() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <SubmitButton
          buttonText="Log Out"
          onClick={() => {
            localStorage.removeItem("authorization");
            navigate("/");
          }}
        />
        <SubmitButton
          buttonText="Delete Account"
          onClick={async () => {
            const response = await axios.delete("http://localhost:3000/api/v1/user/signup", {headers : {
                authorization : localStorage.getItem("authorization")
            }})
            // if(response.data.status)  HERE PUT CONDITION WHAT WILL HAPPENEN WHEN THERE IS AN ERROR WHILE DELETING AND ALSO ADD THESE KIND OF CONDITION TO OTHER AXIOS REQUESTS AS WELL. Also make sure to handle errors and bugs like navigating to different page evn tho you dont have the authorization to. 
            localStorage.removeItem("authorization");
            navigate("/");
            alert(response.data.msg)
          }}
        />
      </div>
    </>
  );
}
