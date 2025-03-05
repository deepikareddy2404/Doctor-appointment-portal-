const mongoose = require("mongoose"); 

const appointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  patient: { type: String, required: true },
  date: { type: Date, required: true }, // Ensure date is stored correctly
  time: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
