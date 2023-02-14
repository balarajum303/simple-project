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

const caste_entry = () => {
  //meta title
  document.title = "Knowledge pro | Admitted Through"

  const [casteEntry, setCasteEntry] = useState([])
  const[feeExcemption,setFeeExcemption]=useState("")
  const [formdetails, setFormdetails] = useState({
    name:"",
    isFeeExcemption :""
  })
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

  const getcasteEntry = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllCaste", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setCasteEntry(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const createcasteEntry = () => {
    // console.log("depthy", formdetails)
   
    const reqBody={
      name: formdetails.name,
      isFeeExcemption :feeExcemption
    }

    console.log("req",reqBody)

    axios.post("http://localhost:8080/admin/adminPage/addCaste", reqBody, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then(() => {
      getcasteEntry()
      if(formdetails.name!=0){
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

  const deletecasteEntry = () => {
    console.log("deletedid",deleteId)

    axios.delete(`http://localhost:8080/admin/adminPage/deleteCaste/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getcasteEntry()
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
      name: "",
      isFeeExcemption: document.getElementById("FeeYes").checked="",
      isFeeExcemption: document.getElementById("FeeValueNo").checked=""


    })
  }
  const restDataHandler = () => {
    clearForm()
    setisEdit(false)
  }
  ///////////////////////.....................edit........//////////////////////////////////
  const getEditEntry = (user) => {
    console.log(localStorage.getItem("token"))
    console.log("edit",user)
    axios.get(`http://localhost:8080/admin/adminPage/getCasteById/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setFormdetails(response.data)
      if(response.data.isFeeExcemption === true){
      document.getElementById('FeeYes').checked =  true;
      }
      if(response.data.isFeeExcemption === false){
      document.getElementById('FeeValueNo').checked =  true;
      }
      setisEdit(true)


    })
    // document.getElementById("FeeYes").value=user.FeeYes
    // document.getElementById("FeeValueNo").value=user.FeeValueNo

  };

  ////////----- update----////////////
  const updatecasteEntry = () => {
    let req = {
      id: formdetails.id,
      name: formdetails.name,
      isFeeExcemption: feeExcemption
    }

    axios.put("http://localhost:8080/admin/adminPage/updateCaste", req, {

      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getcasteEntry()
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
    let newStatus = { ...formdetails }
    let inputName = e.target.name
    newStatus[inputName] = e.target.value
    setFormdetails(newStatus)

  }
  const handleOutputChange = (e) => {
    let newValue = { ...formdetails }
    let valueName = e.target.name
    newValue[valueName] = e.target.value
    setFormdetails(newValue)

    console.log("deepthi", formdetails)
  }
  useEffect(() => {
    getcasteEntry()
  }, [])


  //----- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)


    if (getsearch.length > 0) {
      const searchdata = casteEntry.filter((item) => item.name.toLowerCase().includes(getsearch));
      setCasteEntry(searchdata)
    } else {
      setCasteEntry(filterdata);
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Caste Entry" />

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
                            <td align="right"><span className="mandatory">*</span>Caste Name:</td>
                            <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td>


                            <td align="right"><span className="mandatory">*</span> Eligible for Fees Exemption ?:</td>

                            <td align="left">
                              <input type="radio" name="FeeExcemption" id="FeeYes" value="true" onChange={(e)=>setFeeExcemption(e.target.value)} />yes&nbsp;&nbsp;
                              <input type="radio" name="FeeExcemption" id="FeeValueNo" value="false" onChange={(e)=>setFeeExcemption(e.target.value)} />No
                            </td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary" onClick={isEdit ? updatecasteEntry : createcasteEntry}>{isEdit ? "Update" : "Submit"}</button>
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
                            <Th data-priority="3">Caste Name</Th>
                            <Th data-priority="1">Eligible for Fees Exemption</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {casteEntry.map((user, id) => <Tr key={id}>
                            <Td >{id + 1}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.isFeeExcemption ? "True" : "False"}</Td>
                            <Td><button style={{ border: "none" }}><img src={edit} onClick={() => { getEditEntry(user,user.id) }} /></button></Td>
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
            <Button variant="danger" onClick={(e) => { deletecasteEntry() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  )
}

// caste_entry.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default caste_entry
