import React, { useState,useEffect } from "react";
import "../Styles/Home.css";

const Home = () => {
  const [userName, setuserName] = useState()
  const [show, setshow] = useState(false)

  const homePage = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const aboutdata = await res.json();
      setuserName(aboutdata.name)
      
      if (res.status === 404) {
        throw new Error(res.error);
      }else{
        setshow(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    homePage();
  }, []);
  

  return (
    <React.Fragment>
      <div className="mainhaeder">
        <div className="header">
          <h2 className="Header">Welcome {userName}</h2>
          <h1 classname="sub-header">{show ? 'Happy to see you' : "Welcome MERN developers"}</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
