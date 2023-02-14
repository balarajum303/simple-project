import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

const applicant_received_through = () => {
  //meta title
  document.title = "Knowledge pro | Admitted Through"

  const [receivedThrough, setReceivedThrough] = useState([])
  const [formdetails, setFormdetails] = useState({
    id: "",
    slipRequired:"",
    receivedThrough:""
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

  const getreceivedThrough = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllReceivedThrough", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setReceivedThrough(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const createreceivedThrough = () => {
    console.log("depthy",formdetails)
    axios.post(" http://localhost:8080/admin/adminPage/addReceivedThrough", formdetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then(() => {
      getreceivedThrough()
      clearForm()
    })
  };

  ///////----delete------////////////////

  const deletereceivedThrough = () => {

    axios.delete(`http://localhost:8080/admin/adminPage/deleteReceivedThrough/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getreceivedThrough()
      setShow(false)

    })
  };
  const clearForm = () => {
    setFormdetails({
        id: "",
        slipRequired:"",
        receivedThrough:""

    })
  }
  const restDataHandler = () => {
    clearForm()
  }
  ///////////////////////.....................edit........//////////////////////////////////
  const getEditEntry = (user) => {
    console.log(localStorage.getItem("token"))
    axios.get(`http://localhost:8080/admin/adminPage/getReceivedThroughById/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setFormdetails(response.data)
      setisEdit(true)


    })

  };

  ////////----- update----////////////
  const updatereceivedThrough = () => {
    let req = {
      id: formdetails.id,
      slipRequired:true,
      receivedThrough:mail
  
    }

    axios.put("http://localhost:8080/admin/adminPage/updateReceivedThrough", req, {

      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getreceivedThrough()
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
    getreceivedThrough()
  }, [])


  //----- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)


    if (getsearch.length > 0) {
      const searchdata = receivedThrough.filter((item) => item.name.toLowerCase().includes(getsearch));
      setReceivedThrough(searchdata)
    } else {
      setReceivedThrough(filterdata);
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Applicant received through" />

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
                            <td align="right"><span className="mandatory">*</span>Received Through:</td>
                            <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td>


                            <td align="right"><span className="mandatory">*</span> Slip Required:</td>
                            <td align="left" >
                                                            <input type="radio"  name="slip required" value={formdetails.isCurrent} onChange={(e) => { handleInputChange(e) }} id="yes"  />
                                                            <label htmlFor="yes">Yes</label>
                                                            <input type="radio" id="no" name="slip required" value="2" />
                                                            <label htmlFor="no">No</label>
                                                        </td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary" onClick={isEdit ? updatereceivedThrough : createreceivedThrough}>{isEdit ? "Update" : "Submit"}</button>
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
                            <Th data-priority="3">Received Through</Th>
                            <Th data-priority="1">Slip Required</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {receivedThrough.map((user, id) => <Tr key={id}>
                            <Td >{id + 1}</Td>
                            <Td>{user.receivedThrough}</Td>
                            <Td>{user.slipRequired ? "Yes" : "No"}</Td>
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
            <Button variant="danger" onClick={(e) => { deletereceivedThrough() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  )
}

// applicant_received_through.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default applicant_received_through
