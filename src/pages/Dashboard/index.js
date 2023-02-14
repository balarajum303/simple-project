import PropTypes from "prop-types";
import React from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  CardFooter
} from "reactstrap";

import { Link } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


//i18n
import { withTranslation } from "react-i18next";
import Calender from "pages/Authentication/Calender";


//redux

const Dashboard = props => {

  //meta title
  // document.title = "Dashboard | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content dashBg">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}
          <Row>
            <Col lg={5}>
              <Card>
                <h5 className="card-header bg-transparent border-bottom text-uppercase">News &amp; Events</h5>
                <CardBody>
                  <CardTitle className="mt-0">
                    Special title treatment
                  </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  {/* <Link to="#" className="btn btn-primary">
                    Go somewhere
                  </Link> */}
                </CardBody>
              </Card>
            </Col>

            <Col lg={7} >
              <Card>
              <h5 className="card-header bg-transparent border-bottom text-uppercase">Calender</h5>
                <CardBody  >
                  {/* <blockquote className="card-blockquote mb-0"> */}
                    {/* <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer posuere erat a ante.
                    </CardText> */}
                 
            <Calender/>
            
                    {/* <footer className="blockquote-footer font-size-12">
                      Someone famous in
                      <cite title="Source Title">Source Title</cite>
                    </footer> */}
                  {/* </blockquote> */}
                </CardBody>
              </Card>
            </Col>
            </Row>
            <Row>
            <Col lg={5}>
              <Card>
              <h5 className="card-header bg-transparent border-bottom text-uppercase">Notification</h5>
                <CardBody>
                  <CardTitle className="mt-0">
                    Special title treatment
                  </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link
                    to="#"
                    className="btn btn-primary"
                  >
                    Go somewhere
                  </Link>
                </CardBody>
                <CardFooter className="text-muted">2 days ago</CardFooter>
              </Card>
            </Col>

            <Col lg={7}>
              <Card>
              <h5 className="card-header bg-transparent border-bottom text-uppercase">Profile</h5>
                <CardBody>
                  <blockquote className="card-blockquote mb-0">
                    <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer posuere erat a ante.
                    </CardText>
                    <footer className="blockquote-footer font-size-12">
                      Someone famous in
                      <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
