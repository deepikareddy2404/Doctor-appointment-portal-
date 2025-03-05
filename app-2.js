document.getElementById("appointment-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const doctor   = document.getElementById("doctor").value.trim();
  const patient  = document.getElementById("patient").value.trim();
  const date     = document.getElementById("date").value;
  const time     = document.getElementById("time").value;
  const category = document.getElementById("category").value.trim();

  if (!doctor || !patient || !date || !time || !category) {
    alert("All fields are required.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctor, patient, date, time, category }),
    });

    if (response.ok) {
      alert("Appointment booked!");
      document.getElementById("appointment-form").reset(); // Clear the form after submission
      loadAppointments();
    } else {
      const errorData = await response.json();
      alert("Error: " + (errorData.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("Error booking appointment. See console for details.");
  }
});


async function loadAppointments() {
  try {
    const response = await fetch("http://localhost:5000/api/appointments");
    
    if (!response.ok) {
      throw new Error("Failed to fetch appointments. Server might be down.");
    }

    const data = await response.json();
    
    const list = document.getElementById("appointment-list");
    list.innerHTML = "";

    if (data.length === 0) {
      list.innerHTML = "<li>No appointments found.</li>";
      return;
    }

    data.forEach(appt => {
      const formattedDate = new Date(appt.date).toLocaleDateString();
      const li = document.createElement("li");
      li.textContent = `${appt.patient} booked with Dr. ${appt.doctor} on ${formattedDate} at ${appt.time} for ${appt.category}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    alert("Could not load appointments. Check console for details.");
  }
}


loadAppointments();
