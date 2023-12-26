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
  