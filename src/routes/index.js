import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import about from "pages/Authentication/about"
import Calender from "../pages/Authentication/Calender"
// Admin
import admission_status_entry from "pages/Admin/admission_status_entry"
import admitted_through from "pages/Admin/admitted_through"
import caste_entry from "pages/Admin/caste_entry"
import country from "pages/Admin/country"
import course_scheme_entry from "pages/Admin/course_scheme_entry"
import currency_master from "pages/Admin/currency_master"
import department_entry from "pages/Admin/department_entry"
import detailed_subjects from "pages/Admin/detailed_subjects"
import document_exam_entry from "pages/Admin/document_exam_entry"
import document_type_entry from "pages/Admin/document_type_entry"
import mother_tongue from "pages/Admin/mother_tongue"
import nationality from "pages/Admin/nationality"
import cost_category from "pages/Admin/cost_category"
import admissionNo_entry from "pages/Admin/admissionNo_entry"
import certificate_request_purpose from "pages/Admin/certificate_request_purpose"
import resident_category from "pages/Admin/resident_category"
import applicant_feedback from "pages/Admin/applicant_feedback"
import designation from "pages/Admin/designation"
import subject_code_group from "pages/Admin/subject_code_group"
import sub_religion from "pages/Admin/sub_religion"
import cost_center from "pages/Admin/cost_center"
import religion from "pages/Admin/religion"
import region from "pages/Admin/region"
import pre_requisite_exam from "pages/Admin/pre_requisite_exam"
import occupation from "pages/Admin/occupation"
import program_type from "pages/Admin/program_type"
import state from "pages/Admin/state"
import academic_year from "pages/Admin/academic_year"
import applicant_received_through from "pages/Admin/applicant_received_through"
import courses from "pages/Admin/courses"


const publicRoutes = [
 
  { path: "/logout", component: () => <Redirect to="/" /> },
  { path: "/", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/about", component: about },

  
]

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  // { path: "/", component: Login },

  // //calender
  { path: "/Calender", component: Calender },

  // {path: "/genetate_password",component: genetate_password}
  {path:"/admission_status_entry", component:admission_status_entry},
  {path:"/admitted_through", component:admitted_through},
  {path:"/caste_entry", component:caste_entry},
  {path:"/country", component:country},
  {path:"/course_scheme_entry", component:course_scheme_entry},
  {path:"/courses", component:courses},
  {path:"/currency_master", component:currency_master},
  {path:"/department_entry", component:department_entry},
  {path:"/detailed_subjects", component:detailed_subjects},
  {path:"/document_exam_entry", component:document_exam_entry},
  {path:"/document_type_entry", component:document_type_entry},
  {path:"/mother_tongue", component:mother_tongue},
  {path:"/nationality", component:nationality},
  {path:"/cost_category", component:cost_category},
  {path:"/admissionNo_entry",component:admissionNo_entry},
  {path:"/resident_category",component:resident_category},
  {path:"/applicant_feedback",component:applicant_feedback},
  {path:"/designation",component:designation},
  {path:"/subject_code_group",component:subject_code_group},
  {path:"/sub_religion",component:sub_religion},
  {path:"/cost_center",component:cost_center},
  {path:"/religion",component:religion},
  {path:"/region",component:region},
  {path:"/pre_requisite_exam",component:pre_requisite_exam},
  {path:"/occupation",component:occupation},
  {path:"/program_type",component:program_type},
  {path:"/state",component:state},
  {path:"/academic_year",component:academic_year},
  {path:"/certificate_request_purpose",component:certificate_request_purpose},
  {path:"/applicant_received_through",component:applicant_received_through},
  {path:"/courses",component:courses},
]



export { authProtectedRoutes, publicRoutes }
