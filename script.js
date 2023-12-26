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

// Function to fetch events data from GitHub
const fetchEventsData = async () => {
  const response = await fetch('https://raw.githubusercontent.com/jameswalsh78/calendar/main/events.json');
  const data = await response.json();
  return data;
};

// Function to update the calendar
const updateCalendar = async () => {
  const eventsData = await fetchEventsData();
  const events = eventsData.events;

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

    // Check if there are events for this day
    const eventsForDay = events.filter(event => event.date === `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`);
    if (eventsForDay.length > 0) {
      const eventsList = document.createElement("ul");
      eventsForDay.forEach(event => {
        const eventItem = document.createElement("li");
        eventItem.textContent = event.details;
        eventsList.appendChild(eventItem);
      });
      calendarDay.appendChild(eventsList);
    }

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
