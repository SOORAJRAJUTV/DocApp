


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { useNavigate } from 'react-router-dom'

import { message,Table } from "antd";
import axios from "axios";
import moment from "moment";

const DoctorAppointments = () => {
  const [appointments, Appointments] = useState([]);
  const navigate=useNavigate()
//   const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
    //   dispatch(showLoading());
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    //   dispatch(hideLoading());
      if (res.data.success) {
        Appointments(res.data.data);
      }
    } catch (error) {
    //   dispatch(hideLoading());
    }
  };


  useEffect(() => {
    getAppointments();
  }, []);


  const handleStatus = async (record, status) => {
    try {
    //   dispatch(showLoading());
      const res = await axios.post("/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    //   dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      message.error("Error changing doctor account status");
    //   dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },

    // {
    //   title: "Patient",
    //   dataIndex: "name",
    //   render: (text, record) => <span>{record.userInfo.name}</span>,
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
   
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button className="btn btn-success" onClick={() => handleStatus(record, "approved")} >Approved</button>
              <button  className="btn btn-danger" onClick={() => handleStatus(record, "rejected")}> Rejected</button>
            </div>
          )}
        </div>
      ),
    },

    {
      title: "View",
      dataIndex: "view",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "approved" && (
            <div className="d-flex">
              <button className="btn btn-success" onClick={()=>(navigate("/mynotes"))} >View</button>
             </div>
          )}
        </div>
      ),
    },
  ];


  return (
    <Layout>
      <h1 className="page-header">Appointments </h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
