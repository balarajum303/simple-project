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

const academic_year = () => {
    //meta title
    document.title = "Knowledge pro | Admitted Through"

    const [academicYear, setAcademicYear] = useState([])
    const [formdetails, setFormdetails] = useState({
        year: "",
        id: "",
        isCurrent: "",
    })
    const [isEdit, setisEdit] = useState(false)
    const [deleteId, setDelteID] = useState(null);


    const[SelacademicYear,setSelacedamicYear]=useState([])
    ///-------- search bar filter----/////////
    const [filterdata, setFilterdata] = useState([]);
    const [query, setQuery] = useState('')


    ///////// delete/////////////
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    ////////////-----------get-----------////////////

    const getacademicYear = () => {
        console.log(localStorage.getItem("token"))
        axios.get("http://localhost:8080/admin/adminPage/getAllAcadmicYear", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response)
            setAcademicYear(response.data)
            setFilterdata(response.data)
            setSelacedamicYear(response.data)
        })

    };

    /////------post---------------------------//////////////////////////////////
    const createacademicYear = () => {
        console.log("depthy", formdetails)
        axios.post("http://localhost:8080/admin/adminPage/addAcadmicYear",formdetails, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then(() => {
            getacademicYear()
            clearForm()
        })
    };

    ///////----delete------////////////////

    const deleteacademicYear = () => {

        axios.delete(`http://localhost:8080/admin/adminPage/deleteAcadmicYear/${deleteId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response.data)
            getacademicYear()
            setShow(false)

        })
    };
    const clearForm = () => {
        setFormdetails({
            name: "",
            academicYearCode: "",
            

        })
    }
    const restDataHandler = () => {
        clearForm()
        setisEdit(false)
    }
    ///////////////////////.....................edit........//////////////////////////////////
    const getEditEntry = (user) => {
        console.log(localStorage.getItem("token"))
        axios.get(`http://localhost:8080/admin/adminPage/getAcadmicYearById/${user.id}`, {
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
    const updateacademicYear = () => {
        let req = {
            id: formdetails.id,
            year: formdetails.year,
            isCurrent: formdetails.isCurrent
        }

        axios.put("http://localhost:8080/admin/adminPage/updateAcadmicYear", req, {

            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {

            setFormdetails(response.data)
            getacademicYear()
            setisEdit(false)
            clearForm()
        })
    }


    const handleInputChange = (e) => {
        setFormdetails(e.target.value)
        let newStatus = { ...formdetails }
        let inputName = e.target.name
        newStatus[inputName] = e.target.value
        setFormdetails(newStatus)
        console.log("onchange",formdetails)

    }
    // const handleOutputChange = (e) => {
    //     let newValue = { ...formdetails }
    //     let valueName = e.target.name
    //     newValue[valueName] = e.target.value
    //     setFormdetails(newValue)

    //     console.log("deepthi", formdetails)
    // }
    useEffect(() => {
        getacademicYear()
    }, [])


    //----- search bar logic-----------------------//
    const handlesearch = (event) => {
        const getsearch = event.target.value
        setQuery(getsearch)


        if (getsearch.length > 0) {
            const searchdata = academicYear.filter((item) => item.name.toLowerCase().includes(getsearch));
            setAcademicYear(searchdata)
        } else {
            setAcademicYear(filterdata);
        }
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Admin" breadcrumbItem="Academic Year" />

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
                                                    <td align="right"><span className="mandatory">*</span>Academic Year:</td>
                          {/* <td align="left"><input  type="text" name="name" value={formdetails.name} onChange={(e)=>{handleInputChange(e)}}></input></td> */}
                       <td align="left">
                        <select  name="year"  onChange={(e)=>{handleInputChange(e)}}>
                        {SelacademicYear.map((user,i)=> <option key={i}>{user.year}</option> )}
                        </select>
                       </td>
                                                        <td align="right"><span className="mandatory">*</span>  Is Current ?:</td>
                                                        <td align="left" >
                                                            <input type="radio"  name="isCurrent" value={formdetails.isCurrent} onChange={(e) => { handleInputChange(e) }} id="yes"  />
                                                            <label htmlFor="yes">Yes</label>
                                                            <input type="radio" id="no" name="elgibility" value="2" />
                                                            <label htmlFor="no">No</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right"><span className="mandatory">*</span>Is Current for Admission ?:</td>
                                                        <td align="left" >
                                                            <input type="radio" id="one" name="elgibility" value="1" />
                                                            <label htmlFor="rad1">Yes</label>
                                                            <input type="radio" id="two" name="elgibility" value="2" />
                                                            <label htmlFor="rad2">No</label>
                                                        </td>
                                                    </tr>
                                                </thead>
                                            </Table>
                                            <div className="hstack gap-3 align-center">
                                                <button type="button" className="btn btn-primary" onClick={isEdit ? updateacademicYear : createacademicYear}>{isEdit ? "Update" : "Submit"}</button>
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
                                                        <Th data-priority="3">Academic Year</Th>
                                                        <Th data-priority="1">Is Current ?</Th>
                                                        <Th data-priority="1">Is Current for Admission</Th>
                                                        <Th data-priority="1">Edit</Th>
                                                        <Th data-priority="3">Delete</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {academicYear.map((user, id) => <Tr key={id}>
                                                        <Td >{id + 1}</Td>
                                                        <Td>{user.year}</Td>
                                                        <Td>{user.isCurrent ? "Yes" : "No"}</Td>
                                                        
                                                        <Td>{user.isCurrentForAdmission? "Yes" : "No"}</Td>
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
                        <Button variant="danger" onClick={(e) => { deleteacademicYear() }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </React.Fragment>
    )
}

// academic_year.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default academic_year
