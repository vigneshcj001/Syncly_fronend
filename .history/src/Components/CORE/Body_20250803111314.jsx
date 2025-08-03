import axios from "axios";
import { api } from "../../utils/api";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    onst fetchProfile = async () => {
        try {
          const res = await api.get("/profile/view");
          if (res.data.success) {
            dispatch(addUser(res.data.profile));
            setProfile(res.data.profile);
          } else {
            setErrorMsg(res.data.message || "Profile not found");
          }
        } catch (error) {
          navigate("/login");
          setErrorMsg(error?.response?.data?.message || "Unexpected error");
        }
      };
        useEffect(() => {
          fetchProfile();
        }, []);
      
    return(
        <div>
            Hello World
        </div>
    )
}