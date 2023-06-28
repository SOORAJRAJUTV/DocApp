import Layout from "antd/es/layout/layout";
import React from "react";
import { Col, Row, Input, Form, TimePicker,message } from "antd";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import axios from 'axios'
import moment from 'moment';
// import { white } from 'colors';
// // Add these import statements at the top of your file
// import os from 'os';
// import util from 'util';

// Rest of your code follows...

const ApplyDoctor = () => {
    
    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();


    //handle form
  const handleFinish = async (values) => {
   try{
     dispatch(showLoading())
     const res=await axios.post('/api/v1/user/apply-doctor',
     {...values,userId:user._id,
      timings:[
        moment(values.timings[0],'HH:mm'),
        moment(values.timings[1],'HH:mm')
      ]
     }
    ,
    {
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
     })
     dispatch(hideLoading())
     if(res.data.success){
        message.success(res.data.success);
        navigate('/');
     }
     else{
        message.error(res.data.success);
     }
   }catch(error){
    dispatch(hideLoading())
    console.log(error);
    message.error('Something went Wrong')
   }
  };
  return (
    <Layout>
      
      <h1 className="text-center">ApplyDoctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your address" />
            </Form.Item>
          </Col>
        </Row>



        <h4 className="">Professional Details :</h4>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="FeesPerConsultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="fees Per Consultation" />
            </Form.Item>
          </Col>

          {/* <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Status"
              name="status"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="status" />
            </Form.Item>
          </Col> */}

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <div className="parent">
            <button className="btn btn-primary form-btn " type="submit">
              Submit
            </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
