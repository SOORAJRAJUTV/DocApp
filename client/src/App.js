import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import { useParams } from "react-router-dom";
import DoctorAppointments from "./pages/Appointments";
import Appointments from "./pages/Appointments";

/*  <Route path="/user/book-appointment/:doctorId" element={
          <ProtectedRoute> <BookingPage/> </ProtectedRoute> } />
        </Routes>   */


function App() {
  const {loading}=useSelector(state=>state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/>: 
      (<Routes>
         

          <Route path="/apply-doctor" element={
          <ProtectedRoute> <ApplyDoctor/> </ProtectedRoute> } />
          
          <Route path="/login" element={
          <PublicRoute><Login /></PublicRoute>  } />
        
          <Route path="/register" element={
          <PublicRoute> <Register /></PublicRoute>  } />

         <Route path="/notification" element={
          <ProtectedRoute> <NotificationPage/> </ProtectedRoute> } />

          <Route path="/admin/users" element={
          <ProtectedRoute> <Users/> </ProtectedRoute> } />

         <Route path="/admin/doctors" element={
          <ProtectedRoute> <Doctors/> </ProtectedRoute> } />



          <Route path="/profile/:id" element={
          <ProtectedRoute> <Profile/> </ProtectedRoute> } />


         <Route path="/doctor/book-appointment/:doctorId" element={
          <ProtectedRoute> <BookingPage/> </ProtectedRoute> } />

          <Route path="/appointments" element={
          <ProtectedRoute> <Appointments/></ProtectedRoute> } />

          <Route path="/doctor-appointments" element={
          <ProtectedRoute> <DoctorAppointments /></ProtectedRoute> } />


          <Route path="/" element={
          <ProtectedRoute> <HomePage /></ProtectedRoute> } />


          
         
        </Routes>
        ) } 
        
      </BrowserRouter>
    </>
  );
}

export default App;
