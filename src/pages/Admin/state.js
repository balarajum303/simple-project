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

const state = () => {
    //meta title
    document.title = "Knowledge pro | Admitted Through"

    const [state, setsSate] = useState([])
    const [formdetails, setFormdetails] = useState({
        countryId: "",
        name: "",
        bankStateId: ""

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

    /////----Country drop down-----/////
    const [country, setCountry] = useState([])

    ////////////-----------get-----------////////////

    const getstate = () => {
        console.log(localStorage.getItem("token"))
        axios.get("http://localhost:8080/admin/adminPage/getAllState", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response)
            setsSate(response.data)
            setFilterdata(response.data)
        })

    };
    useEffect(() => {
        getstate()
    }, [])

    /////------post---------------------------//////////////////////////////////
    const createstate = () => {
        console.log("post", formdetails)
        axios.post("http://localhost:8080/admin/adminPage/addState", formdetails, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then(() => {
            getstate()
            if (formdetails.name != 0) {
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

    const deletestate = () => {

        axios.delete(`http://localhost:8080/admin/adminPage/deleteState/${deleteId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response.data)
            getstate()
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
        countryId: "",
        // countryName:"",
        name: "",
        bankStateId: ""

        })
    }
    const restDataHandler = () => {
        clearForm()
        setisEdit(false)
    }
    ///////////////////////.....................edit........//////////////////////////////////
    const getEditEntry = (user) => {
        console.log(localStorage.getItem("token"))
        console.log("edit",user.id)
        axios.get(`http://localhost:8080/admin/adminPage/getStateById/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response)
            setFormdetails(response.data)
            setisEdit(true)


        })
        document.getElementById("countryId").value=user.countryId

    };

    ////////----- update----////////////
    const updatestate = () => {
        let req = {
            id: formdetails.id,
            name: formdetails.name,
            bankStateId: formdetails.bankStateId,
            countryId: formdetails.countryId
        }
        console.log("update",req.id)

        axios.put("http://localhost:8080/admin/adminPage/updateState", req, {

            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {

            setFormdetails(response.data)
            getstate()
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

    const handleChange = (e) => {
        let newStatus = { ...formdetails }
        let inputName = e.target.id
        newStatus[inputName] = e.target.value
        setFormdetails(newStatus)

    }


    //----- search bar logic-----------------------//
    const handlesearch = (event) => {
        const getsearch = event.target.value
        setQuery(getsearch)


        if (getsearch.length > 0) {
            const searchdata = state.filter((item) => item.name.toLowerCase().includes(getsearch));
            setsSate(searchdata)
        } else {
            setsSate(filterdata);
        }
    }

    ///---select dropdown api get------///////
    const getCountry = () => {
        console.log(localStorage.getItem("token"))
        axios.get("http://localhost:8080/admin/adminPage/getAllCountry", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log("religion", response.data)
            //  setdetails(response.data)
            setCountry(response.data)
            setFilterdata(response.data)
        })

    };
    useEffect(() => {
        getCountry()
    }, [])
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Admin" breadcrumbItem="State Entry" />

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
                                                        <td align="right"><span className="mandatory">*</span>Country:</td>
                                                        {/* <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td> */}
                                                        <td align="left">
                                                            <select name="countryName" id="countryId" onChange={(e) => { handleChange(e) }}>
                                                                {country.map((user, i) => <option key={user.id} value={user.id}>{user.name}</option>)}
                                                            </select>
                                                        </td>


                                                        <td align="right"><span className="mandatory">*</span> State:</td>
                                                        <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td>

                                                        <td align="right"><span className="mandatory">*</span>Bank State Id :</td>
                                                        <td align="left"><input type="text" name="bankStateId" value={formdetails.bankStateId} onChange={(e) => { handleInputChange(e) }}></input></td>
                                                    </tr>
                                                </thead>
                                            </Table>
                                            <div className="hstack gap-3 align-center">
                                                <button type="button" className="btn btn-primary" onClick={isEdit ? updatestate : createstate}>{isEdit ? "Update" : "Submit"}</button>
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
                                                        <Th data-priority="3">Country</Th>
                                                        <Th data-priority="1">State</Th>
                                                        <Th data-priority="1">Edit</Th>
                                                        <Th data-priority="3">Delete</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {state.map((user, id) => <Tr key={id}>
                                                        <Td >{id + 1}</Td>
                                                        <Td>{user.countryName}</Td>
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
                        <Button variant="danger" onClick={(e) => { deletestate() }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </React.Fragment>
    )
}

// state.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default state
