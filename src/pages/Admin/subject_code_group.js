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

const subject_code_group = () => {
  //meta title
  document.title = "Knowledge pro | Subject Code"

  const [details, setDetails] = useState([])
  const [formdetails, setFormdetails] = useState({
    name: "",
    id: ""
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

  const getSubjectCodeGroup = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllSubjectCodeGroup", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setDetails(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const postSubjectCodeGroup = () => {
    axios.post("http://localhost:8080/admin/adminPage/addSubjectCodeGroup", formdetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then(() => {
      getSubjectCodeGroup()
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

  const deleteSubjectCodeGroup = (user) => {

    axios.delete(`http://localhost:8080/admin/adminPage/deleteSubjectCodeGroup/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getSubjectCodeGroup()
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

    })
  }
  const restDataHandler = () => {
    clearForm()
  }
  ///////////////////////.....................edit........//////////////////////////////////
  const getEditEntry = (user) => {
    console.log(localStorage.getItem("token"))
    axios.get(`http://localhost:8080/admin/adminPage/getSubjectCodeGroupById/${user.id}`, {
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



  ////////------- update----////////////
  const updateSubjectCodeGroup = () => {
    let req = {
      id: formdetails.id,
      name: formdetails.name
    }

    axios.put("http://localhost:8080/admin/adminPage/updateSubjectCodeGroup", req, {

      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getSubjectCodeGroup()
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

  }
  useEffect(() => {
    getSubjectCodeGroup()
  }, [])


  /////--------- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)

    if (getsearch.length > 0) {
      const searchdata = details.filter((item) => item.name.toLowerCase().includes(getsearch));
      setDetails(searchdata)
    } else {
      setDetails(filterdata);
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Subject Code Group Entry" />

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
                            <td align="right"><span className="mandatory">*</span>Subject Code Group:</td>
                            <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary" onClick={isEdit ? updateSubjectCodeGroup : postSubjectCodeGroup}>{isEdit ? "Update" : "Submit"}</button>
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
                            <Th data-priority="3">Subject Code Group</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {details.map((user, index) => <Tr key={index}>
                            <Td >{index + 1}</Td>
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
            <Button variant="danger" onClick={(e) => { deleteSubjectCodeGroup() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  )
}

// subject_code_group.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default subject_code_group
