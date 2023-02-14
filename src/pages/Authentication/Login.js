import React, { useState } from "react";
import { Link, Redirect, useHistory, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Input, Label, FormFeedback } from "reactstrap";
import axios from "axios";
// Formik validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import logob from "../../assets/images/logob.png"
// import CarouselPage from "../AuthenticationInner/CarouselPage";
import CarouselPage from "./CarouselPage";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const[username,setUsername]=useState([]);
  const[password,setPassword]=useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
   const history=useHistory();
  //  const navigate=useNavigate();
// const navigate=useNavigate()

  //meta title
  document.title = "Login | MCC";

  // Form validation 
  // const validation = useFormik({
  //   enableReinitialize: true,

  //   initialValues: {
  //     username: '',
  //     password: '',
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().required("Please Enter Your Username"),
  //     password: Yup.string().required("Please Enter Your Password"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log("values", values);
  //   }
  // });
  // function sendLoginRequest(e) {
  //   e.preventDefault();
  //   setErrorMsg("");
  //   const reqBody = {
  //     username: username,
  //     password: password,
  //   };
  //   console.log(reqBody)
    
    // fetch("http://localhost:8080/authenticate", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept" : "application/json",
    //   },
    //   body: JSON.stringify(reqBody),
    // })
    
    //   .then(response=>console.log(response))
    //   .then(data=>{
    //     if(data){
    //       console.log(data.authenticationToken)
    //       localStorage.setItem("token",data.authenticationToken)
    //       if(localStorage.getItem("token") !== 'undefined' || localStorage.getItem("token") !== ''){
    //         // history.push("/dashboard");
    //         <Redirect to="/dashboard" />
    //         // navigate("/dashboard")
    //       }else{
    //         setErrorMsg(
    //                 "Invalid Credentials!!"
    //           );
    //       }
    //       }
    //   })


    const postData=(e)=>{
      e.preventDefault();
      setErrorMsg("");
      const reqBody = {
        username: username,
        password: password,
      };
      axios.post("http://localhost:8080/authenticate",{
        username,
        password  })
        .then(({data}) => {
         
          
          console.log(data);
          console.log(data.token)
        
          localStorage.setItem("token",data.token)
          var token=localStorage.getItem("token");
              if(token!=="undefined"){
               // navigate("/dashboard");
                //<Redirect to="/dashboard"/>
               history.push("/dashboard");
      
            }
      
        }).catch((error) => {
          //set error message here
          console.log(error.response.data,"error")
          setErrorMsg("Please Enter Valid Credentials!")
        })
    //     var token=localStorage.getItem("token");
    //     if(token!=="undefined"){
    //       // navigate("/dashboard");
    //       //  <Redirect to="/dashboard"/>
    //       history.push("/dashboard");

    //     }
     
      
  }
  
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4" style={{backgroundColor:'white'}}>
                <div className="w-100" >
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="" className="d-block auth-logo">
                        <img
                          src={logob}
                          alt=""
                          height="100"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Sign in to continue to MCC.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form className="form-horizontal"
                          onSubmit={postData}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Username</Label>
                            <Input
                              name="username"
                              className="form-control"
                              placeholder="Enter username"
                              type="text"
                              onChange={(e)=>setUsername(e.target.value)}
                              // onBlur={handleBlur}
                              value={username}
                              required
                            />
                            {/* {touched.username && errors.username ? (
                              <FormFeedback type="invalid">{errors.username}</FormFeedback>
                            ) : null} */}
                          </div>

                          {/* <div className="mb-3"> */}
                            <div className="float-end">
                              <Link to="" className="text-muted">Forgot password?</Link>
                            </div>
                            <Label className="form-label">Password</Label>
                            <div className="input-group auth-pass-inputgroup">
                              <Input
                                name="password"
                                value={password}
                                type={passwordShow ? "text" : "password"}
                                placeholder="Enter Password"
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                                // onBlur={handleBlur}
                                
                              />
              
                            {/* {touched.password && errors.password ? (
                              <FormFeedback type="invalid">{errors.password}</FormFeedback>
                            ) : null} */}
                          </div>
                          <div>
                {errorMsg ? (
                   <div className="valerror" style={{ color: "red", fontWeight: "bold", align: "center"}}>
                      {errorMsg}
                   </div>
               ) : (
                <></>
                  )}
  
                            </div>

                          {/* <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="auth-remember-check"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div> */}

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                              // onClick={()=>history.push("/dashboard")}
                            >
                              Log In
                            </button>
                          </div>

                        </Form>

                        {/* <Form action="dashboard">
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">
                              Sign in with
                            </h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary me-1"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info me-1"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form> */}
                        {/* <div className="mt-5 text-center">
                          <p>
                            Don&apos;t have an account ?
                            <Link
                              to="pages-register-2"
                              className="fw-medium text-primary"
                            >
                              Signup now
                            </Link>
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      {/* <p className="mb-0">
                        © {new Date().getFullYear()} Skote. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
