import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Table,message } from "antd";
import moment from "moment";
import Layout from "./../components/Layout";

// /api/v1/user/user-appointments

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  // const dispatch = useDispatch();

  const getAppointments = async () => {
    try {  const res = await axios.get('/api/v1/user/user-appointments', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          } })
      // dispatch(hideLoading());
      if (res.data.success) {
        setAppointments(res.data.data);
        
      }
    } catch (error) {
      console.log(error);
      // dispatch(hideLoading());
    }
  };



  useEffect(() => {
    getAppointments()
  }, []);

 


  const columns = [
    {
        title: "ID",
        dataIndex: '_id',
    },

    // {
    //   title: "Name",
    //   dataIndex: 'name',
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },

    {
      title: "Date & Time",
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
           {moment(record.time).format("HH:mm")} 
        </span>
      ),
    },
    {
        title: "Status",
        dataIndex: 'status',
    },
   
  ];

 return ( <Layout>
  <h1 className="page-title">Appointments List</h1>

  <Table columns={columns} dataSource={appointments} />
</Layout>);
}

export default Appointments;