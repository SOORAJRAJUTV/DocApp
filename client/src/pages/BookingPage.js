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
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      const res = await axios.post("/api/v1/doctor/getDoctorById", 
      { doctorId: params.doctorId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.success) {
        setDoctor(res.data.data);
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
        doctorInfo: doctor,
        date: moment(date).format("DD-MM-YYYY"),
        userInfo: user,
        time: moment(time).format("HH:mm"),
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
        date: moment(date).format("DD-MM-YYYY"),
        time: moment(time).format("HH:mm"),
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
    getDoctorData();
  }, []);

  return (
    <Layout>
      <h3>BookingPage</h3>
      <div className="container m-3">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees: {doctor.feesPerConsultation}</h4>
            {/* <h4>
              Timings: {doctor.time[0]} - {doctor.time[1]}
            </h4> */}
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={value => setDate(value)}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={value => setTime(value)}
              />
              <button
                className="btn btn-primary m-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              {isAvailable && (
                <button
                  className="btn btn-primary m-2"
                  onClick={handleBooking}
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
