// Get the current date
const currentDate = new Date();

// Get the current month and year
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

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

// Set the month heading
monthHeading.textContent = `${monthNames[currentMonth]} ${currentYear}`;

// Get the first day of the month and the total days in the month
const firstDay = new Date(currentYear, currentMonth, 1).getDay();
const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

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
