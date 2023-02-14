import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import swal from 'sweetalert';

import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Container,

  CardSubtitle,



} from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Breadcrumbs from "../../components/Common/Breadcrumb"

// Form Mask
import InputMask from "react-input-mask"
import edit from "../../assets/images/edit_icon.gif"
import deleteIcon from "../../assets/images/delete_icon.gif"
import axios from "axios"
import swal from 'sweetalert';
const admissionNo_entry = () => {
  //meta title
  document.title = "Knowledge pro | AdmissionNo Entry"

  const [details, setdetails] = useState([])
  const[user,setUser]=useState([])
  const [formdetails, setFormdetails] = useState({
   
    year: "",
    programTypeId:"",
    prefix: "",
    startNo: "",
  })
  const [isEdit, setisEdit] = useState(false)
  // const[editData,setEditData]=useState([])

  const [academicYear, setAcedamicYear] = useState([])
  ///-------- search bar filter----/////////
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('')


  ///////// delete/////////////
  const [deleteId, setDelteID] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = () => {
    // console.log(localStorage.getItem("token"))
    return fetch("http://localhost:8080/admin/adminPage/getAllProgramType", {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',

        },
    })

        .then((response) => (response.json()))
        .then((data) => setUser(data));

}
// console.log("balu", user);
useEffect(() => {
    fetchData();

}, [])

  ////////////-----------get-----------////////////

  const getadmissionNo_entry = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllAdmissionNoEntry", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setdetails(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const createadmissionNo_entry = () => {
    console.log("post",formdetails)
    // const reqBody={
    //   name: formdetails.name,
    //   startNo :formdetails.startNo,
    //   programTypeId:formdetails.id,
    //   prefix:formdetails.prefix,
    //   year:formdetails.year
    // }
    axios.post("http://localhost:8080/admin/adminPage/addAdmissionNoEntry", formdetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then(() => {
      getadmissionNo_entry()
      if(formdetails.prefix!=0){
        swal({
          title: "Success!",
          text: "Added Successfully!",
          icon: "success",
          button: "Ok!",
        });
      }
      clearForm()
    })
  };

  ///////----delete------////////////////

  const deleteadmissionNoEntry = () => {
  
    axios.delete(`http://localhost:8080/admin/adminPage/deleteAdmissionNoEntry/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getadmissionNo_entry()
      swal({
        title: "Deleted!",
        text: "Deleted Successfully!",
        icon: "success",
        button: "Ok!",
      });
      setShow(false)

    })
  };
  const clearForm = () => {
    setFormdetails({
      programTypeId: "",
      year: "",
      prefix: "",
      startNo: "",
      //currentNo:""


    })
  }

  const restDataHandler = () => {
    clearForm()
    setisEdit(false)
  }
  ///////////////////////.....................edit........//////////////////////////////////
  const getEditEntry = (user) => {
    console.log(user)
    console.log(localStorage.getItem("token"))
    axios.get(`http://localhost:8080/admin/adminPage/getAdmissionNoEntryById/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setFormdetails(response.data)
      setisEdit(true)

      //  setEditData(response.data)
    })
    
    document.getElementById('programType').value = user.programType.id
    document.getElementById('year').value = user.year
  };

  //  console.log("edit",formdetails.id);
  //  console.log("name",formdetails.name);
  //  console.log(localStorage.getItem("token"),"token")

  ////////----- update----////////////
  const updateadmissionNo_entry = () => {
    let req = {
      id: formdetails.id,
      year: formdetails.year,
      programTypeId:formdetails.programTypeId,
      prefix: formdetails.prefix,
      startNo: formdetails.startNo,
      currentNo:formdetails.currentNo
    }
    // console.log("request",req)

    // console.log("react",formdetails.id)
    axios.put("http://localhost:8080/admin/adminPage/updateAdmissionNoEntry", req, {
      //  body:JSON.stringify(req),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getadmissionNo_entry()
      swal({
        title: "Updated!",
        text: "Updated Successfully!",
        icon: "success",
        button: "Ok!",
      });
      setisEdit(false)
      clearForm()
    })
  }


  const handleInputChange = (e) => {
    let newStatus = { ...formdetails }
    let inputName = e.target.name
    newStatus[inputName] = e.target.value
    setFormdetails(newStatus)
    // console.log("details",formdetails)
  }
  useEffect(() => {
    getadmissionNo_entry()
  }, [])

  const handleChange = (e) => {
    let newValue = { ...formdetails }
    let valueName = e.target.id
    newValue[valueName] = e.target.value
    setFormdetails(newValue)
  }
  useEffect(() => {
    getadmissionNo_entry()
  }, [])
  //----- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)
    // console.log(getsearch)

    if (getsearch.length > 0) {
      const searchdata = details.filter((item) => item.name.toLowerCase().includes(getsearch));
      setdetails(searchdata)
    } else {
      setdetails(filterdata);
    }
  }

  const getAcademicYear = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllAcadmicYear", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log("year", response.data)
      //  setdetails(response.data)
      setAcedamicYear(response.data)
      setFilterdata(response.data)
    })

  };
  useEffect(() => {
    getAcademicYear()
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Admission No Entry" />

          <Row>
            <Col>
              <Card>
                <CardBody>

                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        className="table table-striped table-bordered headerTable">
                        <thead>
                          <tr>
                            <td align="right">
                              <label required="required" className='pt'><span className="mandatory">*</span> Program Type </label></td>
                            <td align="left">
                              <select className='pt1' name="name" id="programTypeId"
                                placeholder='Program Type'
                                type="select"
                               
                                onChange={(e) => handleChange(e)}
                                required>
                                <option>-Select-</option>
                                {user.map((userobj) => (
                                  <option key={userobj.id} value={userobj.id}>{userobj.name}</option>
                                ))
                                }
                              </select>
                            </td>
                            {/* </tr>
                        <tr> */}
                            <td align="right"><span className="mandatory">*</span>Prefix:</td>
                            <td align="left"><input type="text" name="prefix" value={formdetails.prefix} onChange={(e) => { handleInputChange(e) }}></input></td>
                            {/* </tr>
                        <tr> */}
                            <td align="right"><span className="mandatory">*</span>Star No:</td>
                            <td align="left"><input type="text" name="startNo" value={formdetails.startNo} onChange={(e) => { handleInputChange(e) }}></input></td>
                            {/* </tr>
                        <tr> */}
                            <td align="right"><span className="mandatory">*</span>Academic Year:</td>
                            <td align="left">
                              <select name="year" value={formdetails.year}  id="year" onChange={(e) => { handleInputChange(e) }}>
                              <option value="">-Select-</option>
                              <option value="2001">2001-2002</option>
                              <option value="2002">2002-2003</option>
                              <option value="2003">2003-2004</option>
                              <option value="2004">2004-2005</option>
                              <option value="2005">2005-2006</option>
                              <option value="2006">2006-2007</option>
                              <option value="2007">2007-2008</option>
                              <option value="2008">2008-2009</option>
                              <option value="2009">2009-2010</option>
                              <option value="2010">2010-2011</option>
                              <option value="2011">2011-2012</option>
                              <option value="2012">2012-2013</option>
                              <option value="2013">2013-2014</option>
                              <option value="2014">2014-2015</option>
                              <option value="2015">2015-2016</option>
                              <option value="2016">2016-2017</option>
                              <option value="2017">2017-2018</option>
                              <option value="2018">2018-2019</option>
                              <option value="2019">2019-2020</option>
                              <option value="2020">2020-2021</option>
                              <option value="2021">2021-2022</option>
                              <option value="2022">2022-2023</option>
                              <option value="2023" selected="selected">2023-2024</option>
                              <option value="2024">2024-2025</option>
                              <option value="2025">2025-2026</option>
                              </select>
                            </td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary" onClick={isEdit ? updateadmissionNo_entry : createadmissionNo_entry}>{isEdit ? "Update" : "Submit"}</button>
                        <button type="button" className="btn btn-secondary" onClick={restDataHandler}>Reset</button>
                      </div>

                      <div className="mt-4 mb-4 mt-sm-0 float-sm-start d-sm-flex align-items-center">
                        <label className="mt-2 d-inline-block me-2">Search</label>
                        <div className="search-box me-2">
                          <div className="position-relative">
                            <Input type="text" value={query} className="form-control" onChange={(e) => handlesearch(e)} />
                            <i className="bx bx-search-alt search-icon" />
                          </div>
                        </div>

                      </div>


                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered"
                      >
                        <Thead>
                          <Tr>
                            <Th data-priority="1">Sl No</Th>
                            <Th data-priority="3">Year</Th>
                            <Th data-priority="3"> Type</Th>
                            <Th data-priority="3">Prefix</Th>
                            <Th data-priority="3">Start No</Th>
                            {/* <Th data-priority="3">Academic Year</Th> */}
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {details.map((user, index) => <Tr key={index}>
                            <Td >{index + 1}</Td>
                            <Td>{user.year}</Td>
                            <Td>{user.programTypeName}</Td>
                            <Td>{user.prefix}</Td>
                            <Td>{user.startNo}</Td>
                            <Td><button style={{ border: "none" }}><img src={edit} onClick={() => { getEditEntry(user, user.id) }} /></button></Td>
                            <Td><button style={{ border: "none" }} onClick={() => setDelteID(user.id)}><img src={deleteIcon} onClick={handleShow} /></button></Td>
                          </Tr>)}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal show={show} centered={true} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Delete.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={(e) => { deleteadmissionNoEntry() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  )
}

// admissionNo_entry.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default admissionNo_entry
