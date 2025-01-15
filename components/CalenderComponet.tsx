"use client";

import React, { useState } from "react";
import { Calendar } from "./ui/calendar";

interface CalenderProps {
  onDateChange: (date: Date | undefined) => void;
}

const CalenderComponent: React.FC<CalenderProps> = ({ onDateChange }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateSelect}
      className="rounded-md border bg-white"
    />
  );
};

export default CalenderComponent;
