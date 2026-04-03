import React, { useState } from 'react';
import styles from './BookingCalendar.module.css';

const BookingCalendar = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(selected);
  };

  const changeMonth = (delta) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return selectedDate && 
           day === selectedDate.getDate() && 
           currentMonth.getMonth() === selectedDate.getMonth() &&
           currentMonth.getFullYear() === selectedDate.getFullYear();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)} className={styles.navBtn}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={() => changeMonth(1)} className={styles.navBtn}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.weekday}>{day}</div>
        ))}
      </div>
      
      <div className={styles.days}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${!day ? styles.empty : ''} ${isToday(day) ? styles.today : ''} ${isSelected(day) ? styles.selected : ''}`}
            onClick={() => day && handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      
      {selectedDate && (
        <div className={styles.timeSlots}>
          <h4>Select Time</h4>
          <div className={styles.timeGrid}>
            {timeSlots.map(time => (
              <button
                key={time}
                className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''}`}
                onClick={() => {
                  setSelectedTime(time);
                  onDateSelect(selectedDate, time);
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;