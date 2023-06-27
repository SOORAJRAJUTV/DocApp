import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import {showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

// /api/v1/user/user-appointments

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointments = async () => {
    try {
      // dispatch(showLoading());
      
      const res = await axios.get("/api/v1/user/userappointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorId.firstName} {record.doctorId.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => (
        <span>
          {record.doctorId.phone} 
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
           {moment(record.time).format("HH:mm")} 
        </span>
      ),
    },
    {
        title: "Status",
        dataIndex: "status",
    }
  ];
  useEffect(() => {
    getAppointments();
  }, []);


  return ( <Layout>
  <h1 className="page-title">Appointments List</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
</Layout>);
}

export default Appointments;