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
  CardSubtitle,
} from "reactstrap"
import Select from "react-select";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Breadcrumbs from "../../components/Common/Breadcrumb"

// Form Mask
import InputMask from "react-input-mask"
import edit from "../../assets/images/edit_icon.gif"
import deleteIcon from "../../assets/images/delete_icon.gif"

const detailed_subjects = () => {
  //meta title
  document.title = "Form Mask | Skote - React Admin & Dashboard Template"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Admin" breadcrumbItem="Detailed Subject Entry" />

          <Row>
            <Col>
              <Card>
                <CardBody>

                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      {/* <Col lg="1">
                        <div className="mb-3 ajax-select mt-3 mt-lg-0 select2-container">
                          <Label>Ajax (remote data)</Label>
                          <Select
                            className="select2-selection"
                          />
                        </div>
                        </Col> */}
                      <Table
                        className="table table-striped table-bordered headerTable">
                        <thead>
                          <tr>
                            <td align="right"><span className="mandatory">*</span> Program Type:</td>
                            <td align="left">
                              <select>
                                <option>select</option>
                              </select>
                            </td>
                            <td align="right"><span className="mandatory">*</span>Program:</td>
                            <td align="left"><input type="text" name="text"></input></td>
                          </tr>
                        </thead>
                      </Table>
                      <Table
                        className="table table-striped table-bordered headerTable">
                        <thead>
                          <tr>
                            <td align="right"><span className="mandatory">*</span>Course:</td>
                            <td align="left"><input type="text" name="text"></input></td>
                            <td align="right"><span className="mandatory">*</span>Subject Name:</td>
                            <td align="left"><input type="text" name="text"></input></td>
                          </tr>
                        </thead>
                      </Table>
                      <div className="hstack gap-3 align-center">
                        <button type="button" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary">Reset</button>
                      </div>

                      {/* <div className="mt-4 mb-4 mt-sm-0 float-sm-start d-sm-flex align-items-center">
                        <label className="mt-2 d-inline-block me-2">Search</label>
                        <div className="search-box me-2">
                          <div className="position-relative">
                            <Input type="text" className="form-control"/>
                            <i className="bx bx-search-alt search-icon" />
                          </div>
                        </div>
                      </div> */}


                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered mt-5"
                      >
                        <Thead>
                          <Tr>
                            <Th data-priority="1">Sl No</Th>
                            <Th data-priority="3">Program Type</Th>
                            <Th data-priority="3">Program</Th>
                            <Th data-priority="3">Course</Th>
                            <Th data-priority="3">Subject Name</Th>
                            <Th data-priority="1">Edit</Th>
                            <Th data-priority="3">Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>597.74</Td>
                            <Td>12:12PM</Td>
                            <Td>12:12PM</Td>
                            <Td>12:12PM</Td>
                            <Td>12:12PM</Td>
                            <Td><button style={{ border: "none" }}><img src={edit} /></button></Td>
                            <Td><button style={{ border: "none" }}><img src={deleteIcon} /></button></Td>
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

detailed_subjects.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
}

export default detailed_subjects
