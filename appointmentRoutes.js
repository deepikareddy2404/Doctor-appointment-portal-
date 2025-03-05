const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// POST - Create an appointment
router.post("/", async (req, res) => {
  try {
    console.log("Received Appointment Data:", req.body);

    const { doctor, patient, date, time, category } = req.body;

    if (!doctor || !patient || !date || !time || !category) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = new Appointment({ doctor, patient, date, time, category });
    await appointment.save();
    
    console.log("Appointment Saved:", appointment);
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// GET - Retrieve all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();

    // Format date before sending response
    const formattedAppointments = appointments.map(appt => ({
      _id: appt._id,
      doctor: appt.doctor,
      patient: appt.patient,
      date: appt.date.toISOString().split("T")[0], // YYYY-MM-DD format
      time: appt.time,
      category: appt.category,
    }));

    res.json(formattedAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
