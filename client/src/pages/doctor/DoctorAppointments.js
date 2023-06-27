
// import React from 'react'
// import Layout from '../../components/Layout'

// const DoctorAppointments = () => {
//   return (
//    <Layout>
    
//    </Layout>
//   )
// }

// export default DoctorAppointments

//new code frm git
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import Layout from "../../components/Layout";
// import { showLoading, hideLoading } from "../../redux/alertsSlice";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { Table } from "antd";
// import moment from "moment";

// const DoctorAppointments=() =>{
//   const [appointments, setAppointments] = useState([]);
//   const dispatch = useDispatch();


//   const getAppointments= async () => {
//     try {
//       dispatch(showLoading());
//       const res= await axios.get(
//         "/api/v1/doctor/doctor-appointments",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         setAppointments(res.data.data);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//     }
//   };

//   const handleStatus = async (record, status) => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post("/api/v1/doctor/update-status",
//         { appointmentsId : record._id, status },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//         getAppointments();
//       }
//     } catch (error) {
//       toast.error("Error changing doctor account status");
//       dispatch(hideLoading());
//     }
//   };


//   const columns = [
//     {
//       title: "Id",
//       dataIndex: "_id",
//     },
//     {
//       title: "Patient",
//       dataIndex: "name",
//       render: (text, record) => <span>{record.userInfo.name}</span>,
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
//     },
//     {
//       title: "Date & Time",
//       dataIndex: "createdAt",
//       render: (text, record) => (
//         <span>
//           {moment(record.date).format("DD-MM-YYYY")}{" "}
//           {moment(record.time).format("HH:mm")}
//         </span>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       render: (text, record) => (
//         <div className="d-flex">
//           {record.status === "pending" && (
//             <div className="d-flex">
//               {/* <h1
//                 className="anchor px-2"
//                 onClick={() => changeAppointmentStatus(record, "approved")}
//               >
//                 Approve
//               </h1>
//               <h1
//                 className="anchor"
//                 onClick={() => changeAppointmentStatus(record, "rejected")}
//               >
//                 Reject
//               </h1> */}

//               <button className="btn btn-success" onClick={()=> handleStatus(record,'approved')}>Approved</button>
//               <button className="btn btn-danger ms-2" onClick={()=> handleStatus(record,'reject')}>Rejected</button>
//             </div>
//           )}
//         </div>
//       ),
//     },
//   ];
//   useEffect(() => {
//     getAppointments();
//   }, []);
//   return (
//     <Layout>
//       <h1 className="page-header">Appointments</h1>
//       <hr />
//       <Table columns={columns} dataSource={appointments} />
//     </Layout>
//   );
// }

// export default DoctorAppointments;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { message } from "antd";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
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

  const handleStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      message.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
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
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "rejected")}
              >
                Rejected
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
