// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { DatePicker, TimePicker,message } from "antd";
// import moment from "moment";
// import { useSelector,useDispatch } from 'react-redux';
// import {showLoading, hideLoading } from "../redux/features/alertSlice";


// const BookingPage = () => {
//   const {user}=useSelector(state=>state.user)
//   const params = useParams();
//   const [doctors, setDoctors] = useState([]);
//   const [date, setDate] = useState();
//   const [time, setTime] = useState();
//   const [isAvailable, setIsAvailable] = useState(false);
//   const dispatch=useDispatch()

//   const getUserData = async () => {
//     try {
//       //changed post to get
//       const res = await axios.post(
//         "/api/v1/doctor/getDoctorById",
//         { doctorId: params.doctorId },
//         {
//           headers:{Authorization :`Bearer ${localStorage.getItem('token')}`}
//         }
//       )
//       if (res.data.success) {
//         setDoctors(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   //Handle Booking
  
//   const handleBooking=async()=>{
//     try{

//       setIsAvailable(true);
//       if(!date && !time){return alert("Date & Time is Required")}
//       dispatch(showLoading())
//       const res=await axios.post('/api/v1/user/book-appointment',
//       {
//         doctorId:params.doctorId,
//         userId:user._id,
//         doctorInfo:doctors,
//         date:date,
//         userInfo:user,
//         time:time
//       },{
//         headers:{Authorization :`Bearer ${localStorage.getItem('token')}`}
//       })
//       dispatch(hideLoading())
//       if(res.data.success){
//         message.success(res.data.message)
//       }

//     }catch(error){
//       dispatch(hideLoading())
//       console.log(error);
//     }
//   }



//   //Checkin Availability

//   const handleAvailability=async()=>{
//     try{
//       dispatch(showLoading())
//       const res=await axios.post('/api/v1/user/booking-availability',
//       { doctorId:params.doctorId,date,time },
//       {
//         headers:{Authorization :`Bearer ${localStorage.getItem('token')}`}
//       });
//       dispatch(hideLoading());
//       if(res.data.success){
//         setIsAvailable(true);
//         console.log(isAvailable);
//         message.success(res.data.message)
//       }else{
//         message.error(res.data.message)
//       }

//     }catch(error){
//       dispatch(hideLoading())
//       console.log(error);
//     }
//   }








//   useEffect(() => {
//     getUserData();
//     //eslint-disable-next-line
//   }, []);

//   return (
//     <Layout>
      
//       <h3>BookingPage</h3>
//       <div className="container m-3">
//         {doctors && (
//           <div>
//             <h4>
//               Dr.{doctors.firstName} {doctors.LastName}
//             </h4>
//             <h4>Fees :{doctors.feesPerConsultataion}</h4>
//             <h4>
//               Timings : {doctors.time[0]} - {doctors.time[1]}
//             </h4>

//             <div className="d-flex  flex-coloumn w-50">
//               <DatePicker
//               aria-required={"true"}
//               className="m-2"
//                 format="DD-MM-YYYY"
//                 onChange={(value) =>{
//                   setDate(moment(value).format("DD-MM-YYYY"))
//                 }}
//               />
//               <TimePicker
//               aria-required={"true"}
//                 format="HH:mm"
//                 className="m-2"
//                 onChange={(value) =>{
//                   setTime(moment(value).format("HH:mm"))
//                 }
//                 }
//               />
//               <button className="btn btn-primary mt-2" onClick={handleAvailability}>
//                 Check Availability
//               </button>
//               <button className="btn btn-dark mt-2" onClick={handleBooking}>
//                 Book Now
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default BookingPage;



import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector(state => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();


  //changed post to get chatgpt
  const getUserData = async () => {
    try {
      console.log("line 181");
      const res = await axios.post("/api/v1/doctor/getDoctorById",
      {
        params: { doctorId: params.doctorId },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`
        // },
      }
      );
      console.log("eqwertyuiopqwertyuiop");   
      if (res.data.success) {
        
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return message.error("Date and time are required.");
      }
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointment', {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctors,
        date: date,
        userInfo: user,
        time: time,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/booking-availability', {
        doctorId: params.doctorId,
        date: date,
        time: time,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
     // eslint-disable-next-line 
  }, []);
   

  return (
    <Layout>
      <h3>BookingPage</h3>
      <div className="container m-3">
        {doctors.length > 0 && (
          <div>
            <h4>
              Dr. {doctors[0].firstName} {doctors[0].lastName}
            </h4>
            <h4>Fees: {doctors[0].feesPerConsultation}</h4>
            <h4>
              Timings: {doctors[0].time[0]} - {doctors[0].time[1]}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={value => setDate(value ? moment(value).format("DD-MM-YYYY") : null)}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={value => setTime(value ? moment(value).format("HH:mm") : null)}
              />
              <button className="btn btn-primary mt-2" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

