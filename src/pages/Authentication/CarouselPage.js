import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay"></div>
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="text-center" style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',background:'mistyrose',borderRadius:8,padding:10}}>
                      <h4 className="mb-3">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                        <span className="text-primary">Mount Carmel College</span>
                       
                      </h4>
                      <div dir="ltr">
                        <Carousel className="owl-carousel owl-theme auth-review-carousel slider_css" id="auth-review-carousel" 
                        showThumbs={false}>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Dear Students, 
MCC has always kept the interests of the students in mind. We request you to have patience and faith in these testing times. The college website and student portal are the only primary authentic sources of information  regarding ESE. Request you to refrain from following or believing any unofficial messages regarding ESE that seem to be circulating on social media. MCC is committed to ensuring student safety and interests always. 
Principal
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                               
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                  
                                  
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  The journey of Mount Carmel College over the past 75 years is a journey of Empowering through Education, making a difference to thousands of young women
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    {/* Abs1981 */}
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    {/* - Skote User */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
