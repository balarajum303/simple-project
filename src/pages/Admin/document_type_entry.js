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

const document_type_entry = () => {
  //meta title
  document.title = "Knowledge pro | Admitted Through"

  const [DocType, setDocType] = useState([])
  const [formdetails, setFormdetails] = useState({
    name: "",
    id: "",
    docShortName: "",
    printName:"",
    displayOrder:"",
    isEducationalInfo:""
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

  const getDocType = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllDocumentType", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setDocType(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const createDocType = () => {
    console.log("post",formdetails)
    axios.post("http://localhost:8080/admin/adminPage/addDocumentType",formdetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then(() => {
      getDocType()
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

  const deleteDocType = () => {

    axios.delete(`http://localhost:8080/admin/adminPage/deleteDocumentType/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getDocType()
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
      docShortName: "",
      printName: "",
      displayOrder: "",
      isEducationalInfo:""

    })
  }
  const restDataHandler = () => {
    clearForm()
    setisEdit(false)
  }
  ///////////////////////.....................edit........//////////////////////////////////
  const getEditEntry = (user) => {
    console.log(localStorage.getItem("token"))
    axios.get(`http://localhost:8080/admin/adminPage/getDocumentTypeById/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setFormdetails(response.data)
      if(response.data.isEducationalInfo === true){
        document.getElementById('infoYes').checked =  true;
        }
        if(response.data.isEducationalInfo === false){
        document.getElementById('infoNo').checked =  true;
        }
      setisEdit(true)


    })

  };

  ////////----- update----////////////
  const updateDocType = () => {
    let req = {
      id: formdetails.id,
      name: formdetails.name,
      docShortName: formdetails.docShortName,
      printName:formdetails.printName,
      displayOrder:formdetails.displayOrder,
      isEducationalInfo:formdetails.isEducationalInfo


    }
    console.log("update",req)

    axios.put("http://localhost:8080/admin/adminPage/updateDocumentType",req, {

      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getDocType()
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
  const handleOutputChange = (e) => {
    let newValue = { ...formdetails }
    let valueName = e.target.name
    newValue[valueName] = e.target.value
    setFormdetails(newValue)

    console.log("values", formdetails)
  }
  useEffect(() => {
    getDocType()
  }, [])


  //----- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)


    if (getsearch.length > 0) {
      const searchdata = DocType.filter((item) => item.name.toLowerCase().includes(getsearch));
      setDocType(searchdata)
    } else {
      setDocType(filterdata);
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Document Type Entry" />

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
                            <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td>


                            <td align="right"><span className="mandatory">*</span> Document Short Name:</td>
                            <td align="left"><input type="text" name="docShortName" value={formdetails.docShortName} onChange={(e) => { handleOutputChange(e) }}></input></td>
                          </tr>
                          <tr>
                          <td align="right"><span className="mandatory">*</span>Print Name:</td>
                            <td align="left"><input type="text" name="printName" value={formdetails.printName} onChange={(e) => { handleInputChange(e) }}></input></td>

                            <td align="right"><span className="mandatory">*</span>Educational Info:</td>
                          <td align="left">
                              <input type="radio" name="isEducationalInfo" id="infoYes" value={formdetails.isEducationalInfo ? "true" : "true"} onChange={(e) => { handleInputChange(e) }}/>yes&nbsp;&nbsp;
                              <input type="radio" id="infoNo" name="isEducationalInfo"  value={formdetails.isEducationalInfo ? "false" : "false"} onChange={(e) => { handleInputChange(e) }}/>No</td>
                          </tr>
                          <tr>
                          <td align="right"><span className="mandatory">*</span>DisplayOrder:</td>
                            <td align="left"><input type="text" name="displayOrder" value={formdetails.displayOrder} onChange={(e) => { handleInputChange(e) }}></input></td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary" onClick={isEdit ? updateDocType : createDocType}>{isEdit ? "Update" : "Submit"}</button>
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
                            <Th data-priority="1">Document Short Name</Th>
                            <Th data-priority="3">Print name</Th>
                            <Th data-priority="3">DisplayOrder</Th>
                            <Th data-priority="3">Educational Info</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {DocType.map((user, id) => <Tr key={id}>
                            <Td >{id + 1}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.docShortName}</Td>
                            <Td>{user.printName}</Td>
                            <Td>{user.displayOrder}</Td>
                            <Td>{user.isEducationalInfo ? "Yes" : "No"}</Td>
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
            <Button variant="danger" onClick={(e) => { deleteDocType() }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  )
}

// document_type_entry.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default document_type_entry
