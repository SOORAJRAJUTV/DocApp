const express = require("express");
const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController,
    
    
  } = require("../controllers/userCtrl");
  const authMiddleware = require("../middlewares/authMiddleware");


  const router = express.Router();

  //REGISTER || POST
router.post("/register", registerController);


//LOGIN || POST
router.post("/login", loginController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post("/get-all-notification",authMiddleware, getAllNotificationController);

router.post("/delete-all-notification",authMiddleware, deleteAllNotificationController);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//Booking Avliability
router.post("/booking-availability", authMiddleware,bookingAvailabilityController);

//Appointments List
router.get("/userappointments", authMiddleware, userAppointmentsController);

module.exports = router;


