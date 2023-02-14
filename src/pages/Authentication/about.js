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
import { set } from "lodash";

const about = () => {
  //meta title
  document.title = "Knowledge pro | Admission Status Entry"

  const [admissionDetails, setAdmissionDetails] = useState([])
  const [formdetails, setFormdetails] = useState({
    name: "",
    id: ""
  })
  const [isEdit, setisEdit] = useState(false);
  const [deleteId, setDelteID] = useState(null);


  ///-------- search bar filter----/////////
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('')


  ///////// delete/////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  ////////////-----------get-----------////////////

  const getAdmissionEntry = () => {
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:8080/admin/adminPage/getAllAdmissionStatus", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response)
      setAdmissionDetails(response.data)
      setFilterdata(response.data)
    })

  };

  /////------post---------------------------//////////////////////////////////
  const createAdmissionEntry = () => {
    axios.post("http://localhost:8080/admin/adminPage/addAdmissionStatus", formdetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then(() => {
      getAdmissionEntry()
      clearForm()
    })
  };

  ///////----delete------////////////////

  const deleteAdmissionEntry = () => {

    axios.delete(`http://localhost:8080/admin/adminPage/deleteAdmissionStatus/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {
      console.log(response.data)
      getAdmissionEntry()
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
    axios.get(`http://localhost:8080/admin/adminPage/getAdmissionStatusById/${user.id}`, {
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
  const updateAdmissionEntry = () => {
    let req = {
      id: formdetails.id,
      name: formdetails.name
    }

    axios.put("http://localhost:8080/admin/adminPage/updateAdmissionStatus", req, {
      //  body:JSON.stringify(req),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',

      },
    }).then((response) => {

      setFormdetails(response.data)
      getAdmissionEntry()
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
    getAdmissionEntry();
  }, []);



  //----- search bar logic-----------------------//
  const handlesearch = (event) => {
    const getsearch = event.target.value
    setQuery(getsearch)
    // console.log(getsearch)

    if (getsearch.length > 0) {
      const searchdata = admissionDetails.filter((item) => item.name.toLowerCase().includes(getsearch));
      setAdmissionDetails(searchdata)
    } else {
      setAdmissionDetails(filterdata);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
      <Container>
      <Breadcrumbs title="About" breadcrumbItem="About" />
                    {/* write Html code or structure */}
                </Container>
      </div>
    </React.Fragment>
  )
}

// about.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// }

export default about
