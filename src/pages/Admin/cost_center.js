// import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import swal from 'sweetalert';

// import {
//   Row,
//   Col,
//   Form,
//   Label,
//   Input,
//   Card,
//   CardBody,
//   CardTitle,
//   Container,

//   CardSubtitle,



// } from "reactstrap"
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import Breadcrumbs from "../../components/Common/Breadcrumb"

// // Form Mask
// import InputMask from "react-input-mask"
// import edit from "../../assets/images/edit_icon.gif"
// import deleteIcon from "../../assets/images/delete_icon.gif"
// import axios from "axios"

// const cost_center = () => {
//   //meta title
//   document.title = "Knowledge pro | Sub category"

//   const [CostCenter, setCostCenter] = useState([])
//   const [formdetails, setFormdetails] = useState({
//     centerName: "",
//     // id: "",
//     feeCostCategoryId: "",
//   })
//   const[category,setCategory]= useState([])
//   const [isEdit, setisEdit] = useState(false)
//   const [deleteId, setDelteID] = useState(null);


//   ///-------- search bar filter----/////////
//   const [filterdata, setFilterdata] = useState([]);
//   const [query, setQuery] = useState('')


//   ///////// delete/////////////
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


//   ////////////-----------get-----------////////////

//   const getCostCenter = () => {
//     console.log(localStorage.getItem("token"))
//     axios.get("http://localhost:8080/admin/adminPage/getAllCostCenter", {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`,
//         'Content-Type': 'application/json',

//       },
//     }).then((response) => {
//       console.log(response)
//       setCostCenter(response.data)
//       setFilterdata(response.data)
//     })

//   };

//   /////------post---------------------------//////////////////////////////////
//   const createCostCenter = () => {
//     axios.post("http://localhost:8080/admin/adminPage/addCostCenter",formdetails, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`,
//         'Content-Type': 'application/json',

//       },
//     }).then(() => {
//       getCostCenter()
//       if(formdetails.name!=0){
//         swal({
//           title: "Success!",
//           text: "Added Successfully!",
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//       clearForm()
//     })
//   };

//   ///////----delete------////////////////

//   const deleteCostCenter = () => {

//     axios.delete(`http://localhost:8080/admin/adminPage/deleteCostCenter/${deleteId}`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`,
//         'Content-Type': 'application/json',

//       },
//     }).then((response) => {
//       console.log(response.data)
//       getCostCenter()
//       swal({
//         title: "Deleted!",
//         text: "Deleted Successfully!",
//         icon: "success",
//         button: "Ok!",
//       });
//       setShow(false)

//     })
//   };
//   const clearForm = () => {
//     setFormdetails({
//       name: "",
//       CostCenterCode: "",

//     })
//   }
//   const restDataHandler = () => {
//     clearForm()
//     setisEdit(false)
//   }
//   ///////////////////////.....................edit........//////////////////////////////////
//   const getEditEntry = (user) => {
//     console.log(localStorage.getItem("token"))
//     axios.get(`http://localhost:8080/admin/adminPage/getCostCenterById/${user.id}`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`,
//         'Content-Type': 'application/json',

//       },
//     }).then((response) => {
//       console.log(response)
//       setFormdetails(response.data)
//       setisEdit(true)


//     })

//   };

//   ////////----- update----////////////
//   const updateCostCenter = () => {
//     let req = {
//       id: formdetails.id,
//       centerName: formdetails.centerName,
//       feeCostCategoryId: formdetails.feeCostCategoryId
//     }

//     axios.put("http://localhost:8080/admin/adminPage/updateCostCenter",req, {

//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`,
//         'Content-Type': 'application/json',

//       },
//     }).then((response) => {

//       setFormdetails(response.data)
//       getCostCenter()
//       swal({
//         title: "Updated!",
//         text: "Updated Successfully!",
//         icon: "success",
//         button: "Ok!",
//       });
//       setisEdit(false)
//       clearForm()
//     })
//   }


//   const handleInputChange = (e) => {
//     let newStatus = { ...formdetails }
//     let inputName = e.target.name
//     newStatus[inputName] = e.target.value
//     setFormdetails(newStatus)

//   }
 
//   useEffect(() => {
//     getCostCenter()
//   }, [])


//   //----- search bar logic-----------------------//
//   const handlesearch = (event) => {
//     const getsearch = event.target.value
//     setQuery(getsearch)


//     if (getsearch.length > 0) {
//       const searchdata = CostCenter.filter((item) => item.name.toLowerCase().includes(getsearch));
//       setCostCenter(searchdata)
//     } else {
//       setCostCenter(filterdata);
//     }
//   }
// ///---select dropdown api get------///////
// const getcategory=()=>{
//     console.log(localStorage.getItem("token"))
//   axios.get("http://localhost:8080/admin/adminPage/getAllCostCategory", {
//    headers: {
//      'Authorization': `Bearer ${localStorage.getItem("token")}`,
//      'Content-Type': 'application/json',

//    },
//  }).then((response)=>{
//    console.log("category",response.data) 
//   //  setdetails(response.data)
//   setCategory(response.data)
//    setFilterdata(response.data)
//   })
     
//  };
//  useEffect(()=>{
//     getcategory()
//  },[])

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           <Breadcrumbs title="Admin" breadcrumbItem="Cost Center Entry" />

//           <Row>
//             <Col>
//               <Card>
//                 <CardBody>

//                   <div className="table-rep-plugin">
//                     <div
//                       className="table-responsive mb-0"
//                       data-pattern="priority-columns"
//                     >
//                       <Table
//                         className="table table-striped table-bordered headerTable">
//                         <thead>
//                           <tr>
//                             <td align="right"><span className="mandatory">*</span>Cost category:</td>
//                             {/* <td align="left"><input type="text" name="name" value={formdetails.name} onChange={(e) => { handleInputChange(e) }}></input></td> */}
//                             <td align="left">
//                         <select  name="centerName"  onChange={(e)=>{handleInputChange(e)}}>
//                         {category.map((user,i)=> <option key={i}>{user.name}</option> )}
//                         </select>
//                        </td>

//                             <td align="right"><span className="mandatory">*</span>Cost Center Name:</td>
//                             <td align="left"><input type="text" name="CostCenterCode" value={formdetails.categoryId} onChange={(e) => { handleInputChange(e) }}></input></td>
//                           </tr>
//                         </thead>
//                       </Table>
//                       <div className="hstack gap-3 align-center">
//                         <button type="button" className="btn btn-primary" onClick={isEdit ? updateCostCenter : createCostCenter}>{isEdit ? "Update" : "Submit"}</button>
//                         <button type="button" className="btn btn-secondary" onClick={restDataHandler}>Reset</button>
//                       </div>

//                       <div className="mt-4 mb-4 mt-sm-0 float-sm-start d-sm-flex align-items-center">
//                         <label className="mt-2 d-inline-block me-2">Search</label>
//                         <div className="search-box me-2">
//                           <div className="position-relative">
//                             <Input type="text" value={query} className="form-control" onChange={(e) => handlesearch(e)} />
//                             <i className="bx bx-search-alt search-icon" />
//                           </div>
//                         </div>

//                       </div>


//                       <Table
//                         id="tech-companies-1"
//                         className="table table-striped table-bordered"
//                       >
//                         <Thead>
//                           <Tr>
//                             <Th data-priority="1">Sl No</Th>
//                             <Th data-priority="3">Cost category</Th>
//                             <Th data-priority="1">Cost Center Name</Th>
//                             <Th data-priority="1">Edit</Th>
//                             <Th data-priority="3">Delete</Th>
//                           </Tr>
//                         </Thead>
//                         <Tbody>
//                           {CostCenter.map((user, id) => <Tr key={id}>
//                             <Td >{id + 1}</Td>
//                             <Td>{user.centerName}</Td>
//                             <Td>{user.feeCostCategoryId}</Td>
//                             <Td><button style={{ border: "none" }}><img src={edit} onClick={() => { getEditEntry(user, user.id) }} /></button></Td>
//                             <Td><button style={{ border: "none" }} onClick={() => setDelteID(user.id)}><img src={deleteIcon} onClick={handleShow} /></button></Td>
//                           </Tr>)}
//                         </Tbody>
//                       </Table>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//         <Modal show={show} centered={true} onHide={handleClose} animation={false}>
//           <Modal.Header closeButton>
//             <Modal.Title>Delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure you want to Delete.</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={(e) => { deleteCostCenter() }}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </React.Fragment>
//   )
// }

// // admitted_through.propTypes = {
// //   value: PropTypes.any,
// //   onChange: PropTypes.func,
// // }

// export default cost_center
