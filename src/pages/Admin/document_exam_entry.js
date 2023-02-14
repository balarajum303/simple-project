import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
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

const document_exam_entry = () => {
  //meta title
  document.title = "Knowledge pro | Document Exam Entry"

  const [subReligion, setSubReligion] = useState([])
  const [formdetails, setFormdetails] = useState({
   
    name: "",
    doctypeId: "",
    
    
 
    
  })
  const[religion,setReligion]= useState([])
  const [isEdit, setisEdit] = useState(false)
  const [deleteId, setDelteID] = useState(null);


  ///-------- search bar filter----/////////
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('')


  ///////// delete/////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  ////////////-----------get-----------////////////

  const getDoc = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllDocumentExamEntry", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setSubReligion(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const createsubReligion = () => {
    console.log("post-sub",formdetails)
    axios.post("http://localhost:8080/admin/adminPage/addDocumentExamEntry", formdetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    }).then((result) => {
      console.log(result,"post api call result")
      getDoc()
      swal({
        title: "Success!",
        text: "Added Successfully!",
        icon: "success",
        button: "Ok!",
      });
      clearForm()
    })
  };

  ///////----delete------////////////////

  const deletesubReligion = () => {

    axios.delete(`http://localhost:8080/admin/adminPage/deleteDocumentExamEntry/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getDoc()
      swal({
        title: "Success!",
        text: "Deleted Successfully!",
        icon: "success",
        button: "Ok!",
      });
      setShow(false)

    })
  };
  const clearForm = () => {
    setFormdetails({
      name: "",
      doctypeId: "",

    })
  }
  const restDataHandler = () => {
    clearForm()
    setisEdit(false)
  }
  ///////////////////////.....................edit........//////////////////////////////////
  const getEditEntry = (user) => {
    console.log("sub-edit",user.id)
    axios.get(`http://localhost:8080/admin/adminPage/getDocumentExamEntryById/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setFormdetails(response.data)
      setisEdit(true)


    })
    document.getElementById("doctypeId").value=user.doctypeId
  };

  ////////----- update----////////////
  const updatesubReligion = () => {
    let req = {
      id: formdetails.id,
      name: formdetails.name,
      doctypeId: formdetails.doctypeId
    }
    console.log("update-sub",req)

    axios.put("http://localhost:8080/admin/adminPage/updateDocumentExamEntry", req, {

      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getDoc()
      swal({
        title: "Success!",
        text: "Updated Successfully!",
        icon: "success",
        button: "Ok!",
      });
      setisEdit(false)
      clearForm()
    })
  }


  const handleInputChange = (e) => {
    console.log(e.target.id,"event target name")
    let newValue = { ...formdetails }
    let valueName = e.target.id
    newValue[valueName] = e.target.value
    console.log(newValue,"new value")
    setFormdetails(newValue)
    console.log("religion-onchange", formdetails)

  }
  const handleOutputChange = (e) => {
    console.log(e.target.name,"event target value")
    let newValue = { ...formdetails }
    let valueName = e.target.name
    newValue[valueName] = e.target.value
    console.log(newValue,"new values")
    setFormdetails(newValue)

    console.log("caste-onchange", formdetails)
  }
  useEffect(() => {
    getDoc()
  }, [])


  //----- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)


    if (getsearch.length > 0) {
      const searchdata = subReligion.filter((item) => item.religionName.toLowerCase().includes(getsearch));
      setSubReligion(searchdata)
    } else {
      setSubReligion(filterdata);
    }
  }
///---select dropdown api get------///////
const getReligion=()=>{
    console.log(localStorage.getItem("token"))
  axios.get("http://localhost:8080/admin/adminPage/getAllDocumentType", {
   headers: {
     'Authorization': `Bearer ${localStorage.getItem("token")}`,
     'Content-Type': 'application/json',

   },
 }).then((response)=>{
   console.log("religion",response.data) 
  //  setdetails(response.data)
  setReligion(response.data)
   setFilterdata(response.data)
  })
     
 };
 useEffect(()=>{
    getReligion()
 },[])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Document Exam Entry" />

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
                            <td align="right"><span className="mandatory">*</span>Document Type:</td>
                            {/* <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td> */}
                            <td align="left" >
                        <select name="religionName" id="doctypeId" onChange={(e)=>{handleInputChange(e)}}>
                          <option value="" style={{textAlign:"center"}}>----Select----</option>
                        {religion.map((user)=> 
                        { 
                          return <option key={user.id} value={user.id}>{user.name}</option>
                         })}
                        </select>
                        
                       </td>

                            <td align="right"><span className="mandatory">*</span> Document Exam:</td>
                            <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleOutputChange(e) }}></input></td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary" onClick={isEdit ? updatesubReligion : createsubReligion}>{isEdit ? "Update" : "Submit"}</button>
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
                            <Th data-priority="3">Document Type</Th>
                            <Th data-priority="1">Document Exam</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {subReligion.map((user, id) => <Tr key={id}>
                            <Td >{id + 1}</Td>
                            <Td>{user.docName}</Td>
                            <Td>{user.name}</Td>
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
            <Button variant="danger" onClick={(e) => { deletesubReligion() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  )
}

// admitted_through.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default document_exam_entry
