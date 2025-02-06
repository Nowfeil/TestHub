// import React, { useState, useEffect } from "react";
// import {
//   Row,
//   Col,
//   Form,
//   Input,
//   Button,
//   Select,
//   notification,
// } from "antd";
// import "./Signup.css";
// import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { signUpUser, accountCreated } from "../actions/authActions";
// import { Link } from "react-router-dom";

// function Signup(props) {
//   const [showSelect, setShowSelect] = useState(false);
//   const history = useHistory();
//   const { Option } = Select;
//   const { isLoading } = props;
//   const [form] = Form.useForm(); // Ant Design Form instance

//   const submitForm = (values) => {
//     props.sendSignUpRequest(values);
//     console.log(values);
//   };

//   const openNotification = () => {
//     notification.open({
//       message: "Account Created",
//       description:
//         "Congratulations, Now you are part of our family. Please login to continue.",
//       duration: 3,
//     });
//   };

//   useEffect(() => {
//     if (props.accountCreated) {
//       openNotification();
//       props.sendUserAccountCreated();
//       form.resetFields(); // Reset form fields after successful signup
//       history.push("/signup");
//     }
//   }, [props.accountCreated]); // Only run when accountCreated changes

//   const handleSelect = (select, optionData) => {
//     if (optionData.value === "teacher") {
//       setShowSelect(true);
//     } else {
//       setShowSelect(false);
//     }
//   };

//   return (
//     <>
//       <Row justify="center" align="middle" className="hero">
//         <Col xs={22} sm={22} md={8} lg={8} className="signup__container">
//           <p className="sub-title__signup">🎓 EMS</p>
//           <Form
//             form={form} // Attach the form instance
//             name="basic"
//             initialValues={{ remember: true }}
//             onFinish={submitForm}
//           >
//             <div className="element__wrapper">
//               <Form.Item
//                 name="firstName"
//                 rules={[{ required: true, message: "Please input your First Name!" }]}
//               >
//                 <Input placeholder="First Name" />
//               </Form.Item>
//               <Form.Item
//                 name="lastName"
//                 rules={[{ required: true, message: "Please input your Last Name!" }]}
//               >
//                 <Input placeholder="Last Name" />
//               </Form.Item>
//             </div>

//             <Form.Item
//               name="email"
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input placeholder="abcd@gmail.com" />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[{ required: true, message: "Please input your password!" }]}
//             >
//               <Input.Password placeholder="Password" />
//             </Form.Item>

//             <Form.Item
//               name="phone"
//               rules={[{ required: true, message: "Please input your Phone Number!" }]}
//             >
//               <Input type="tel" placeholder="7275XXXXXX" />
//             </Form.Item>

//             <div className="element__wrapper">
//               <Form.Item name="role">
//                 <Select defaultValue="Role" onSelect={handleSelect}>
//                   <Option value="student">Student</Option>
//                   <Option value="teacher">Teacher</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item name="section">
//                 <Select defaultValue="Section" disabled={showSelect}>
//                   <Option value="A">A</Option>
//                   <Option value="B">B</Option>
//                   <Option value="C">C</Option>
//                   <Option value="D">D</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item name="className">
//                 <Select defaultValue="Class" disabled={showSelect}>
//                   <Option value="VIII">VIII</Option>
//                   <Option value="IX">IX</Option>
//                   <Option value="X">X</Option>
//                 </Select>
//               </Form.Item>
//             </div>

//             <div
//               className="link"
//               style={{ textAlign: "center", fontWeight: 500, marginBottom: "15px" }}
//             >
//               <Link to="/signin">Already have an account? Sign in</Link>
//             </div>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 className="sign__up"
//                 htmlType="submit"
//                 loading={isLoading}
//               >
//                 {!isLoading ? "Sign Up" : "Creating Account"}
//               </Button>
//             </Form.Item>
//           </Form>
//         </Col>
//       </Row>
//     </>
//   );
// }

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   isLoading: state.auth.isLoading,
//   accountCreated: state.auth.accountCreated,
// });

// const mapDispatchToProps = (dispatch) => ({
//   sendSignUpRequest: (values) => dispatch(signUpUser(values)),
//   sendUserAccountCreated: () => dispatch(accountCreated()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);

import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Select, notification } from "antd";
import "./Signup.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUser, accountCreated } from "../actions/authActions";
import { Link } from "react-router-dom";

function Signup(props) {
  const [showSelect, setShowSelect] = useState(true);
  const history = useHistory();
  const { Option } = Select;
  const { isLoading, signupError, accountCreated } = props;
  const [form] = Form.useForm();

  // Handle form submission
  const submitForm = (values) => {
    props.sendSignUpRequest(values);
  };

  // Notification for successful account creation
  const openSuccessNotification = () => {
    notification.success({
      message: "Account Created",
      description: "Congratulations! Now you are part of our family. Please login to continue.",
      duration: 3,
    });
  };

  // Notification for errors (like User Already Exists)
  const openErrorNotification = (message) => {
    notification.error({
      message: "Signup Failed",
      description: message,
      duration: 3,
    });
  };

  useEffect(() => {
    if (accountCreated) {
      openSuccessNotification();
      props.sendUserAccountCreated();
      form.resetFields();
      history.push("/signin");
    }
  }, [accountCreated]);

  useEffect(() => {
    if (signupError) {
      openErrorNotification(signupError);
    }
  }, [signupError]);

  // Handle role selection to show/hide Class & Section fields
  const handleSelect = (value) => {
    setShowSelect(value !== "teacher");
  };

  return (
    <Row justify="center" align="middle" className="hero">
      <Col xs={22} sm={22} md={8} lg={8} className="signup__container">
        <p className="sub-title__signup">🎓 EMS</p>
        <Form
          form={form}
          name="signup"
          initialValues={{ role: "student" }}
          onFinish={submitForm}
        >
          <div className="element__wrapper">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Please input your First Name!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Please input your Last Name!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="abcd@gmail.com" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
              { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number!" },
            ]}
          >
            <Input type="tel" placeholder="7275XXXXXX" />
          </Form.Item>

          <div className="element__wrapper">
            <Form.Item name="role" rules={[{ required: true, message: "Please select a role!" }]}>
              <Select defaultValue="student" onChange={handleSelect}>
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>

            <Form.Item name="section" rules={[{ required: !showSelect, message: "Select a section!" }]}>
              <Select defaultValue="Section" disabled={!showSelect}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
            </Form.Item>

            <Form.Item name="className" rules={[{ required: !showSelect, message: "Select a class!" }]}>
              <Select defaultValue="Class" disabled={!showSelect}>
                <Option value="VIII">VIII</Option>
                <Option value="IX">IX</Option>
                <Option value="X">X</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="link" style={{ textAlign: "center", fontWeight: 500, marginBottom: "15px" }}>
            <Link to="/signin">Already have an account? Sign in</Link>
          </div>

          <Form.Item>
            <Button type="primary" className="sign__up" htmlType="submit" loading={isLoading}>
              {!isLoading ? "Sign Up" : "Creating Account..."}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  accountCreated: state.auth.accountCreated,
  signupError: state.auth.signupError,
});

const mapDispatchToProps = (dispatch) => ({
  sendSignUpRequest: (values) => dispatch(signUpUser(values)),
  sendUserAccountCreated: () => dispatch(accountCreated()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

