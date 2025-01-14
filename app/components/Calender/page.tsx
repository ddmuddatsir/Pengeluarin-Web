"use client";

import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

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