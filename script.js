// Get the current date
let currentDate = new Date();

// Get the container elements
const calendarContainer = document.getElementById("calendar-container");
const monthHeading = document.getElementById("month-heading");
const calendarDays = document.getElementById("calendar-days");

// Array of month names
const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];
// Function to update the calendar
const updateCalendar = () => {
    // Set the month heading
    monthHeading.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
    // Clear previous calendar days and headings
    calendarDays.innerHTML = "";
  
    // Get the first day of the month and the total days in the month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
    // Array of day names
    const dayNames = Array.from({ length: 7 }, (_, i) => {
      const tempDate = new Date(0, 0, 1 + i);
      return tempDate.toLocaleDateString('en-US', { weekday: 'short' });
    });
  
    // Generate day name headings
    for (const dayName of dayNames) {
      const dayHeading = document.createElement("div");
      dayHeading.classList.add("day-heading");
      dayHeading.textContent = dayName;
      calendarDays.appendChild(dayHeading);
    }
  
    // Generate the calendar days
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day", "empty");
      calendarDays.appendChild(emptyDay);
    }
  
    for (let day = 1; day <= totalDays; day++) {
      const calendarDay = document.createElement("div");
      calendarDay.classList.add("day");
      calendarDay.textContent = day;
      calendarDays.appendChild(calendarDay);
    }
  
    // ... (any additional logic or customization)
  };
  
// Initial calendar update
updateCalendar();

// Function to go to the next month
const nextMonth = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
};

// Function to go to the previous month
const prevMonth = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
};

// Attach event listeners to navigation buttons
document.getElementById("next-month-btn").addEventListener("click", nextMonth);
document.getElementById("prev-month-btn").addEventListener("click", prevMonth);

// Function to open the event popup
const openEventPopup = (day) => {
    const eventPopup = document.getElementById("event-popup");
    const eventDate = document.getElementById("event-date");
    const eventInput = document.getElementById("event-input");
  
    eventDate.textContent = `${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
    eventInput.value = "";
  
    eventPopup.style.display = "block";
  };
  
  // Function to close the event popup
  const closeEventPopup = () => {
    const eventPopup = document.getElementById("event-popup");
    eventPopup.style.display = "none";
  };
  
  // Function to save the event
  const saveEvent = () => {
    const eventInput = document.getElementById("event-input").value;
    // You can handle the event data as needed, e.g., save to a database, update UI, etc.
    console.log(`Event saved: ${eventInput}`);
    closeEventPopup();
  };
  
  // Attach event listener to each calendar day
  const calendarDaysContainer = document.getElementById("calendar-days");
  calendarDaysContainer.addEventListener("click", (event) => {
    const clickedDay = event.target.textContent;
    if (clickedDay.trim() !== "") {
      openEventPopup(clickedDay);
    }
  });
  
  // Attach event listeners to popup buttons
  document.getElementById("save-event-btn").addEventListener("click", saveEvent);
  document.getElementById("cancel-event-btn").addEventListener("click", closeEventPopup);
  