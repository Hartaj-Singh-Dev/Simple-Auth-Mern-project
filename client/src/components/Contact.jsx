import React, { useEffect, useState } from "react";
import "../Styles/Contact.css";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";

const Contact = () => {
  const [contactData, setcontactData] = useState({name:'',email:'',phone:"",message:""});

  const contactPage = async () => {
    try {
      const res = await fetch("http://localhost:8000/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const aboutdata = await res.json();
      setcontactData({...contactData,name:aboutdata.name,email:aboutdata.email,phone:aboutdata.phone})
      if (res.status === 404) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    contactPage();
  }, []);
  
  //Danynamic Data
  const hinput = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setcontactData({...contactData,[name]:value})
  }
{/*  Contact Form*/}
  const contactForm = async (e)=>{
    e.preventDefault();

    const {name,email,phone,message}= contactData;
    try{
      const response  = await fetch('http://localhost:8000/contactform',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,phone,message}),
        credentials:'include'
      }).then((res)=>{
        setcontactData({...contactData,message:""})
        alert("Data transfreed to backend");}).catch((err)=>{console.log(err);}) 

    }catch(err){
      console.log(err);
    }

  }
  {/*  Contact Form*/}
  


  return (
    <React.Fragment>
      <div className="contact_info">
        <div className="container-fluid  ">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <PhoneIcon />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+91 9815153073</div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <EmailIcon />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">
                    hartajsinghsidhu2005@gmail.com
                  </div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <HomeIcon />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Phaphere,Mansa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Form */}

      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form-title">
                  <h1>Get In Touch</h1>
                </div>
                <form id="contact_form" method="POST">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form"
                      value={contactData.name}
                      className="contact_form_input-name"
                      name="name"
                      onChange={(event)=>{hinput(event)}}
                      placeholder="Your Name"
                      required="true"
                    />
                    <input
                      type="email"
                      id="contact_form"
                      value={contactData.email}
                      className="contact_form_input-email"
                      name="email"
                      onChange={(event)=>{hinput(event)}}
                      placeholder="Your Email"
                      required="true"
                    />
                    <input
                      type="number"
                      id="contact_form"
                      value={contactData.phone}
                      className="contact_form_input-number"
                      name="phone"
                      onChange={(event)=>{hinput(event)}}
                      placeholder="Your Phone Number"
                      required="true"
                    />
                  </div>
                  <div className="contact-form-text mt-4">
                    <textarea
                      className="text_field_contact_form_message"
                      id=""
                      cols="90"
                      rows="5"
                      name="message"
                     value={contactData.message}
                      placeholder="Message"
                      onChange={(event)=>{hinput(event)}}
                    ></textarea>
                  </div>
                  <div className="contact_from_button">
                    <button type="Submit" className="button" onClick={contactForm}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
    </React.Fragment>
  );
};

export default Contact;
