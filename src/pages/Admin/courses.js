// import PropTypes from 'prop-types'
// import React from "react"
// import { Modal, ModalBody } from "reactstrap"

// const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
//   return (
//     <Modal size="sm" isOpen={show} toggle={onCloseClick} centered={true}>
//       <div className="modal-content">
//         <ModalBody className="px-4 py-5 text-center">
//           <button type="button" onClick={onDeleteClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
//           <div className="avatar-sm mb-4 mx-auto">
//             <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
//               <i className="mdi mdi-trash-can-outline"></i>
//             </div>
//           </div>
//           <p className="text-muted font-size-16 mb-4">Are you sure you want to permanently erase the job.</p>

//           <div className="hstack gap-2 justify-content-center mb-0">
//             <button type="button" className="btn btn-danger" onClick={onDeleteClick}>Delete Now</button>
//             <button type="button" className="btn btn-secondary" onClick={onCloseClick}>Close</button>
//           </div>
//         </ModalBody>
//       </div>
//     </Modal>
//   )
// }

// DeleteModal.propTypes = {
//   onCloseClick: PropTypes.func,
//   onDeleteClick: PropTypes.func,
//   show: PropTypes.any
// }

// export default DeleteModal
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

const courses = () => {
    //meta title
    document.title = "Knowledge pro | Course Entry"

    const [scemeDetails, setScemeDetails] = useState([])
    
    const [isEdit, setisEdit] = useState(false)
    const [deleteId, setDelteID] = useState(null);


    ///-------- search bar filter----/////////
    const [filterdata, setFilterdata] = useState([]);
    const [query, setQuery] = useState('')


    ///////// delete/////////////
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /////---campus Hook------//////
    const [campus, setCampus] = useState([])


    ////////////////course code...//////////////////////////
    const [programType, setProgramType] = useState('');
    const [stream, setStream] = useState('');
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [formdetails, setFormdetails] = useState({
        programId:"",
        courseName: "",
        maxIntake: "",
        code: "",
        isWorkExperienceRequired: "",
        isWorkExpMandatory: "",
        isAppearInOnline: "",
        isApplicationProcessSms: "",
        onlyForApplication: "",
        isDetailMarksPrint: "",
        courseMarksCard: "",
        courseNameCertificate: "",
        payCode: "",
        amount: "",
        currencyId: "",
        workLocationId: "",
        intapplicationFees: "",
        noOfAttemptsMidsem: "",
        courseCommencementDate: "",
        bankNameCourse: "",
        bankNameFullCourse: "",
        bankIncludeSectionCourse: "",
        startRegNo: "",
        regNoStartPrefix: ""

    })
    
    const programTypeHandler = (e) => {
        fetchProgramData(e.target.value);
        setProgramType(e.target.value);
        // console.log("ptype", e.target.value)
    }

    // const programHandler = (e) => {
    //     // fetchCourseData(e.target.value);
    //     setStream(e.target.value);
    // }

    // console.log("prgrmType", programType)
    const fetchData = () => {
        // console.log(localStorage.getItem("token"))
        return fetch("http://localhost:8080/admin/adminPage/getAllProgramType", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response) => response.json())
            .then((data) => setUser(data));

    }
    // console.log("balu", user);
    useEffect(() => {
        fetchData();

    }, [])

    const fetchProgramData = (id) => {
        // console.log(localStorage.getItem("token"))
        console.log("prgrmId", id)


        return fetch(`http://localhost:8080/admin/adminPage/getProgramFilter?programTypeId=${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }


    ////////////-----------get-----------////////////

    const getSchemeEntry = () => {
        // console.log(localStorage.getItem("token"))
        axios.get("http://localhost:8080/admin/adminPage/getAllCourses", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response)
            setScemeDetails(response.data)
            setFilterdata(response.data)
        })

    };
    useEffect(() => {
        getSchemeEntry()
    }, [])                     
    /////------post---------------------------//////////////////////////////////
    const createSchemeEntry = () => {
        console.log("course-post", formdetails)
        axios.post("http://localhost:8080/admin/adminPage/addCoursesEntry",formdetails, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then(() => {
            getSchemeEntry()
            clearForm()
            fetchData()

        })
    };

    ///////----delete------////////////////

    const deleteSchemeEntry = () => {

        axios.delete(`http://localhost:8080/admin/adminPage/deleteCourses/${deleteId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            // console.log(response.data)
            getSchemeEntry()
            setShow(false)

        })
    };
    const clearForm = () => {
        setFormdetails({
            name: "",
            programId:"",
            courseName: "",
            maxIntake: "",
            code: "",
            isWorkExperienceRequired: "",
            isWorkExpMandatory: "",
            isAppearInOnline: "",
            isApplicationProcessSms: "",
            onlyForApplication: "",
            isDetailMarksPrint: "",
            courseMarksCard: "",
            courseNameCertificate: "",
            payCode: "",
            amount: "",
            currencyId: "",
            workLocationId: "",
            intapplicationFees: "",
            noOfAttemptsMidsem: "",
            courseCommencementDate: "",
            bankNameCourse: "",
            bankNameFullCourse: "",
            bankIncludeSectionCourse: "",
            startRegNo: "",
            regNoStartPrefix: ""
        })
    }
    const restDataHandler = () => {
        clearForm()
        setisEdit(false)
    }
    ///////////////////////.....................edit........//////////////////////////////////
    const getEditEntry = (user) => {
        // console.log(localStorage.getItem("token"))
        axios.get(`http://localhost:8080/admin/adminPage/getCoursesById/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            // console.log(response)
            setFormdetails(response.data)
            setisEdit(true)

        })

    };


    ////////----- update----////////////
    const updateSchemeEntry = () => {
        let req = {
            id: formdetails.id,
            name: formdetails.name
        }

        axios.put("http://localhost:8080/admin/adminPage/updateCourses", req, {

            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {

            setFormdetails(response.data)
            getSchemeEntry()
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
    
 
    


    //----- search bar logic-----------------------//
    const handlesearch = (event) => {
        const getsearch = event.target.value
        setQuery(getsearch)
        // console.log(getsearch)

        if (getsearch.length > 0) {
            const searchdata = scemeDetails.filter((item) => item.courseName.toLowerCase().includes(getsearch));
            setScemeDetails(searchdata)
        } else {
            setScemeDetails(filterdata);
        }
    }


   

    ////---campus dropdown get----///////
    const getCampus = () => {
        // console.log(localStorage.getItem("token"))
        axios.get("http://localhost:8080/admin/adminPage/getAllWorkLocation", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',

            },
        }).then((response) => {
            console.log(response)
            setScemeDetails(response.data)
            setFilterdata(response.data)
            setCampus(response.data)
        })

    };
    useEffect(() => {
        getCampus()
    }, [])
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Admin" breadcrumbItem="Course Scheme Entry" />

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>

                                    <div className="table-rep-plugin">
                                        <div
                                            className="table-responsive mb-0"
                                            data-pattern="priority-columns"
                                        >
                                            {/* <form onSubmit={submitHandler}> */}
                                            <Table
                                                className="table table-striped table-bordered headerTable">
                                                <tr className="fieldLabel">
                                                    <td align="right">
                                                        <label required="required" className='pt'><span className="mandatory">*</span> Program Type </label></td>
                                                    <td align="left">
                                                        <select className='pt1' name="program_type" id="program_type"
                                                            placeholder='Program Type'
                                                            type="select"
                                                            value={programType}
                                                            onChange={(e) => programTypeHandler(e)}
                                                            required>
                                                            <option>-Select-</option>
                                                            {user.map((userobj) => (
                                                                <option key={userobj.id}  value={userobj.id}>{userobj.name}</option>
                                                            ))
                                                            }
                                                        </select>
                                                    </td>
                                                    <td align="right">
                                                        <label htmlFor="program" required="required" className='program'><span className="mandatory">*</span>Program</label></td>
                                                    <td align="left">
                                                        <select className='program1' name="programId" id="program-Id"
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                            type='select'
                                                            
                                                            value={formdetails.programId}
                                                            onChange={(e) =>  handleInputProgramChange(e)}
                                                            required>
                                                            <option>-Select-</option>
                                                            {users.map((userobj) => (
                                                                <option key={userobj.programId} value={userobj.id}>{userobj.name}</option>
                                                            ))
                                                            }
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="courseCode"><span className="mandatory">*</span>Course Code : </label></td>
                                                    <td align="left">
                                                        <input type="text" id="cCode" name="code" value={formdetails.code} onChange={(e) => handleInputChange(e)} required /></td>
                                                    <td align="right">
                                                        <label htmlFor="courseName"><span className="mandatory">*</span>Course Name : </label></td>
                                                    <td align="left">
                                                        <input type="text" id="cName" name="courseName" value={formdetails.courseName} onChange={(e) => handleInputChange(e)} required /></td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="maximumIntake"><span className="mandatory">*</span>Maximum Intake : </label></td>
                                                    <td align="left">
                                                        <input type="number" id="mIntake" name="maxIntake" value={formdetails.maxIntake} onChange={(e) => handleInputChange(e)} required /></td>
                                                    <td align="right">
                                                        <label htmlFor="courseName In Certificate">Course-Name in Certificate : </label></td>
                                                    <td align="left">
                                                        <input type="text" id="cName In Certificate" name="courseNameCertificate" value={formdetails.courseNameCertificate} onChange={(e) => handleInputChange(e)} required /></td>
                                                </tr>

                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="payCode">Pay Code : </label></td>
                                                    <td align="left">
                                                        <input type="number" id="payCode" name="payCode" value={formdetails.payCode} onChange={(e) => handleInputChange(e)} /></td>
                                                    <td align="right">
                                                        <label htmlFor="courseName For Sem Marks card">Course-Name For Sem.Marks Card : </label></td>
                                                    <td align="left">
                                                        <input type="text" id="courseMarksCard" name="courseMarksCard" value={formdetails.courseMarksCard} onChange={(e) => handleInputChange(e)} /></td>

                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="applicationFee">Application Fee :</label></td>
                                                    <td align="left">
                                                        <input type="number" id="applicationFee" name="amount" value={formdetails.amount} onChange={(e) => handleInputChange(e)} /></td>
                                                    <td align="right">
                                                        <label htmlFor="applicationFeeInternational"><span className="mandatory">*</span>Application Fee (International) : </label></td>
                                                    <td align="left">
                                                        <select required name="currencyId" value={formdetails.currencyId} onChange={(e) => handleInputChange(e)}>
                                                            <option value="0">_select_</option>
                                                            <option value="1">INR</option>
                                                        </select>  <input type="number" id="applicationFeeInternational" name="intapplicationFees" value={formdetails.intapplicationFees} onChange={(e) => handleInputChange(e)} style={{ minWidth: "inherit", maxWidth: 55 }} /></td>
                                                </tr >
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="workExperienceRequired">Work Experience Required : </label></td>
                                                    <td align="left">
                                                        <input type="radio" name="isWorkExperienceRequired" id="work-experience" onChange={(e) => handleInputChange(e)} value={formdetails.isWorkExperienceRequired ? "true" : "true"} />yes &nbsp;&nbsp;
                                                        <input type="radio" id="work-experience" name="isWorkExperienceRequired" onChange={(e) => handleInputChange(e)} value={formdetails.isWorkExperienceRequired ? "false" : "false"} />No</td>
                                                    <td align="right">
                                                        <label htmlFor="is-detail-marks-print">Is Detail Marks Print : </label></td>
                                                    <td align="left">
                                                        <input type="radio" name="isDetailMarksPrint" id="is-detail-marks-print" onChange={(e) => handleInputChange(e)} value={formdetails.isDetailMarksPrint ? "true" : "true"} />yes&nbsp;&nbsp;
                                                        <input type="radio" id="is-detail-marks-print" name="isDetailMarksPrint" onChange={(e) => handleInputChange(e)} value={formdetails.isDetailMarksPrint ? "false" : "false"} />No
                                                    </td>
                                                </tr>
                                                <tr>

                                                    <td align="right">
                                                        <label htmlFor="workExperienceMandatory">Work Experience Mandatory : </label></td>
                                                    <td align="left">
                                                        <input type="radio" name="isWorkExpMandatory" id="work-experience-mandatory" onChange={(e) => handleInputChange(e)} value={formdetails.isWorkExpMandatory ? "true" : "true"} />yes&nbsp;&nbsp;
                                                        <input type="radio" id="work-experience-mandatory" name="isWorkExpMandatory" onChange={(e) => handleInputChange(e)} value={formdetails.isWorkExpMandatory ? "false" : "false"} />No</td>
                                                    <td align="right">
                                                        <label htmlFor="apply-in-online">Appply In Online : </label></td>
                                                    <td align="left">
                                                        <input type="radio" name="isAppearInOnline" id="apply-in-online" onChange={(e) => handleInputChange(e)} value={formdetails.isAppearInOnline ? "true" : "true"} />yes &nbsp;&nbsp;
                                                        <input type="radio" id="apply-in-online" name="isAppearInOnline" onChange={(e) => handleInputChange(e)} value={formdetails.isAppearInOnline ? "false" : "false"} />No
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="application-procesiing-sms">Application Processing Sms : </label>
                                                    </td>
                                                    <td align="left">
                                                        <input type="radio" name="isApplicationProcessSms" id="application-procesiing-sms" onChange={(e) => handleInputChange(e)} value={formdetails.isApplicationProcessSms ? "true" : "true"} />yes&nbsp;&nbsp;
                                                        <input type="radio" id="application-procesiing-sms" name="isApplicationProcessSms" onChange={(e) => handleInputChange(e)} value={formdetails.isApplicationProcessSms ? "false" : "false"} />No
                                                    </td>
                                                    <td align="right">
                                                        <label htmlFor="only-for-application">Only For Application : </label></td>
                                                    <td align="left">
                                                        <input type="radio" name="onlyForApplication" id="only-for-application" onChange={(e) => handleInputChange(e)} value={formdetails.onlyForApplication ? "true" : "true"} />yes &nbsp;
                                                        <input type="radio" name="onlyForApplication" id="only-application" onChange={(e) => handleInputChange(e)} value={formdetails.onlyForApplication ? "false" : "false"} />No
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="bank-name">Bank Name (For Smart Card) : </label>
                                                    </td>
                                                    <td align="left">
                                                        <input type="text" name="bankNameCourse" id="bank-name" value={formdetails.bankNameCourse} onChange={(e) => handleInputChange(e)} /></td>
                                                    <td align="right">
                                                        <label htmlFor="bank-full-name">Bank Full Name (For Smart Card) : </label></td>
                                                    <td align="left">
                                                        <input type="text" name="bankNameFullCourse" id="bank-full-name" value={formdetails.bankNameFullCourse} onChange={(e) => handleInputChange(e)} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="bank-include-section">Bank Include Section(For Smart Card) : </label>
                                                    </td>
                                                    <td align="left">
                                                        <input type="radio" name="bankIncludeSectionCourse" id="bank-include-section" onChange={(e) => handleInputChange(e)} value={formdetails.bankIncludeSectionCourse ? "true" : "true"} />yes&nbsp;&nbsp;
                                                        <input type="radio" name="bankIncludeSectionCourse" id="bank-include-section" onChange={(e) => handleInputChange(e)} value={formdetails.bankIncludeSectionCourse ? "false" : "false"} />No
                                                    </td>
                                                    <td align="right">
                                                        <label htmlFor="course-commencement-date">Course Commencement Date : </label>
                                                    </td>
                                                    <td align="left">
                                                        <input type="Date" name="courseCommencementDate" id="course-commencement-date" value={formdetails.courseCommencementDate} onChange={(e) => handleInputChange(e)} />
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="campus"><span className="mandatory">*</span>Campus : </label></td>
                                                    <td align="left">
                                                        <select required name="workLocationId" value={formdetails.workLocationId} onChange={(e) => handleInputChange(e)}>
                                                            <option>-Select-</option>
                                                            {campus.map((userobj) => (
                                                                <option key={userobj.id} value={userobj.id}>{userobj.name}</option>
                                                            ))
                                                            }
                                                        </select></td>
                                                    <td align="right">
                                                        <label htmlFor="No Of Midsem Repeat Attempts">No Of Midsem Repeat Attempts : </label></td>
                                                    <td align="left">
                                                        <select required name="noOfAttemptsMidsem" value={formdetails.noOfAttemptsMidsem} onChange={(e) => handleInputChange(e)}>
                                                            <option value="0">_Select_</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select></td>
                                                </tr>
                                                <tr>
                                                    <td align="right">
                                                        <label htmlFor="reg-no-start-prefix">Reg No. Start Prefix : </label></td>
                                                    <td align="left">
                                                        <input type="text" name="regNoStartPrefix" id="reg-no-start-prefix" value={formdetails.regNoStartPrefix} onChange={(e) => handleInputChange(e)} /></td>
                                                    <td align="right">
                                                        <label htmlFor="start-reg-no"> Start Reg. No. : </label></td>
                                                    <td align="left">
                                                        <input type="text" name="startRegNo" id="start-reg-no" value={formdetails.startRegNo} onChange={(e) => handleInputChange(e)} /></td>
                                                </tr>
                                            </Table>
                                            {/* </form> */}
                                            <div className="hstack gap-3 align-center">
                                                <button type="button" className="btn btn-primary" onClick={isEdit ? updateSchemeEntry : createSchemeEntry}>{isEdit ? "Update" : "Submit"}</button>
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
                                                        <Th data-priority="2">Program Type</Th>
                                                        <Th data-priority="3">Program</Th>
                                                        <Th data-priority="4">Course Name</Th>
                                                        <Th data-priority="5">Maximum Intake</Th>
                                                        <Th data-priority="6">Autonomous</Th>
                                                        <Th data-priority="7">Work Experience Required</Th>
                                                        <Th data-priority="8">Is Detail Marks Print</Th>
                                                        <Th data-priority="9">PayCode</Th>
                                                        <Th data-priority="10">Application Fee</Th>
                                                        <Th data-priority="11">Application Fee(International)</Th>
                                                        <Th data-priority="12">Assign Department</Th>
                                                        <Th data-priority="13">Edit</Th>
                                                        <Th data-priority="14">Delete</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {scemeDetails.map((user, index) => <Tr key={index}>
                                                        <Td >{index + 1}</Td>
                                                        <Td>{user.programTypeName}</Td>
                                                        <Td>{user.programName}</Td>
                                                        <Td>{user.courseName}</Td>
                                                        <Td>{user.maxIntake}</Td>
                                                        <Td>{user.isAutonomous ? "true" : "false"}</Td>
                                                        <Td>{user.isWorkExperienceRequired ? "true" : "false"}</Td>
                                                        <Td>{user.isDetailMarksPrint ? "true" : "false"}</Td>
                                                        <Td>{user.payCode}</Td>
                                                        <Td>{user.amount}</Td>
                                                        <Td>{user.intapplicationFees}</Td>
                                                        <Td>{user.courseName}</Td>
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
                        <Button variant="danger" onClick={(e) => { deleteSchemeEntry() }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </React.Fragment>
    )
}

// courses.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default courses

