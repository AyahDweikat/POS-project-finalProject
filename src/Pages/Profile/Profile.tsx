import { Avatar, Typography, Box } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect, useState, ChangeEvent } from "react";
import { fetchApiWithAuthNoBody, fetchImage } from "../../Utils/fetchApi";
import { _token } from "../../Utils/Utils";
import styles from "./profile.module.css";

interface User {
  _id: string;
  userName: string;
  email: string;
  profilePic: string;
}
function Profile() {
  const [userData, setUserData] = useState<User>({
    _id: "",
    userName: "",
    email: "",
    profilePic: "",
  });
  const fetchUserData = async (_token: string) => {
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/user/getProfile`,
      `black__${_token}`
    );
    if (results.message == "user profile") {
      setUserData(results.user);
    }
    return results;
  };
  useEffect(() => {
    fetchUserData(_token);
  }, []);
  const sendImage = async(formData: FormData)=>{
    const results = await fetchImage(
      "PATCH",
      formData,
      `https://posapp.onrender.com/user/addProfileImg`,
      `black__${_token}`
    );
    console.log(results)
  }
  const handleFileChange = async(e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length){
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      sendImage(formData)
    }
  };
  return (
    <>
      <Box sx={{ position: "relative", width: "40%", margin: "auto" }}>
        <Avatar
          alt={userData.userName}
          src={userData.profilePic}
          sx={{
            width: 200,
            height: 200,
            margin: "auto",
            mt: "40px",
            fontSize: "100px",
          }}
        />
        <label className={styles.customFileUpload}>
          <input
            className="inputFileUpload"
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <CameraAltIcon sx={{ color: "secondary.main" }} />
        </label>
        <Typography sx={{ textAlign: "left", ml: "50px", fontWeight:"600", fontSize:"16px", color:"secondary.main" }}>
          User Name:
        </Typography>
        <Typography sx={{ textAlign: "left", ml: "50px", pb:"15px" }}>
          {userData.userName}
        </Typography>
        <Typography sx={{ textAlign: "left", ml: "50px", fontWeight:"600", fontSize:"16px", color:"secondary.main" }}>
          Email:
        </Typography>
        <Typography sx={{ textAlign: "left", ml: "50px", pb:"15px" }}>
          {userData.email}
        </Typography>
      </Box>
    </>
  );
}

export default Profile;
