import React, { useEffect, useState } from "react";
import  {useHistory} from 'react-router-dom'
import "../Styles/About.css";


const About = () => {
  const history =  useHistory()
 const [userData, setuserData] = useState({})
  const callaboutPage = async ()=>{
    try{
      const res = await fetch("http://localhost:8000/about",{
         method:"GET",
         headers:{
           Accept: "application/json",
           "Content-type":"application/json"
         },
         credentials:"include"
        })
       const aboutdata = await res.json()
       setuserData(aboutdata)         
       if(res.status === 404){
         history.push("/login")
         throw new Error(res.error)
       }
       
    }catch(err){
      console.log(err);
      history.push("/login")
    }
  }

  useEffect(() => {
    callaboutPage();
  },[])
  return (
    <React.Fragment>
      <div className="container emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <img
                src="https://source.unsplash.com/200x300/?people"
                alt="person"
              />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h4>{userData.name}</h4>
                <h5>{userData.email}</h5>
                <p className="profile-rating mt-3 mb-5">
                  
                  Rankings <span>10/10</span>
                </p>
                <ul class="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a href="#home" className="nav-link active" id="home-tab" data-toggle="tab" role='tab'>About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#profile" className="nav-link " id="profile-tab" data-toggle="tab" role='tab'>Timeline</a>
                    </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
                <input type="text" value="Edit Profile" className="profile-edit-btn"/>
            </div>
          </div>
          <div className="row">
              <div className="col-md-4">
                  <div className="profile-work">
                      <p>Work-Link</p>
                      <a href="">Instagram</a>
                      <a href="">Youtube</a>
                      <a href="">ClubHouse</a>
                  </div>
              </div>
              <div className="col-md-8 pd-5 about-info">
                  <div className="tab-content profile-tab" id='mytabcontent'>
                      <div className="tabe-pane fade-show-active" id="home" role="tabpanel" aria-labelledby="home-tab">
                          <div className="row mt-3">
                              <div className="col-md-6">
                                  <label>User-id = 10</label>
                              </div>
                              <div className="col-md-6">
                                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam ratione at volupta</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default About;
