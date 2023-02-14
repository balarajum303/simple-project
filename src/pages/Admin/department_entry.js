import React from "react"
import PropTypes from "prop-types"
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
  CardSubtitle
  
} from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Breadcrumbs from "../../components/Common/Breadcrumb"

// Form Mask
import InputMask from "react-input-mask"
import edit from "../../assets/images/edit_icon.gif"
import deleteIcon from "../../assets/images/delete_icon.gif"

const department_entry = () => {
  //meta title
  document.title = "Form Mask | Skote - React Admin & Dashboard Template"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Department Entry" />

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
                          <td align="right"><span className="mandatory">*</span> Admission Status:</td>
                          <td align="left"><input  type="text" name="text"></input></td>
                          <td align="right"><span className="mandatory">*</span> Admission Status2:</td>
                          <td align="left"><input  type="text" name="text"></input></td>
                          {/* <td align="right"><span className="mandatory">*</span> Admission Status3:</td>
                          <td align="left"><input type="text"  className="form-control" name="text"></input></td>
                          <td align="right"><span className="mandatory">*</span> Admission Status3:</td>
                          <td align="left"><input type="text"  className="form-control" name="text"></input></td>
                          <td align="right"><span className="mandatory">*</span> Admission Status3:</td>
                          <td align="left"><input type="text"  className="form-control" name="text"></input></td>
                          <td align="right"><span className="mandatory">*</span> Admission Status3:</td>
                          <td align="left"><input type="text"  className="form-control" name="text"></input></td> */}
                        </tr>
                        </thead>
                      </Table> 
                       <div className="hstack gap-3 align-center">
                            <button type="button" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-secondary">Reset</button>
                        </div>

                      <div className="mt-4 mb-4 mt-sm-0 float-sm-start d-sm-flex align-items-center">
                        <label className="mt-2 d-inline-block me-2">Search</label>
                        <div className="search-box me-2">
                          <div className="position-relative">
                            <Input type="text" className="form-control"/>
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
                            <Th data-priority="3">Admission Status</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>597.74</Td>
                            <Td>12:12PM</Td>
                            <Td><button style={{border:"none"}}><img src={edit}/></button></Td>
                            <Td><button style={{border:"none"}}><img src={deleteIcon}/></button></Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

department_entry.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
}

export default department_entry
