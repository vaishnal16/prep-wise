import React, { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface DatePickerProps {
  selected?: Date
  onSelect: (date: Date) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ selected, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(selected || new Date())
  const [isOpen, setIsOpen] = useState(false)

  const handleDateSelect = (date: Date) => {
    onSelect(date)
    setIsOpen(false)
  }

  const handleMonthChange = (increment: number) => {
    setCurrentDate(prevDate => increment > 0 ? addMonths(prevDate, 1) : subMonths(prevDate, 1))
  }

  const handleYearChange = (year: number) => {
    setCurrentDate(prevDate => new Date(year, prevDate.getMonth(), 1))
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className={cn(
          "w-[240px] justify-start text-left font-normal",
          !selected && "text-muted-foreground"
        )}
      >
        {selected ? format(selected, 'PPP') : <span>Pick a date</span>}
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-[280px] rounded-md border bg-popover p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => handleMonthChange(-1)}>&lt;</Button>
            <div className="text-sm font-medium">
              <select
                value={currentDate.getFullYear()}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="bg-transparent"
              >
                {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <span className="mx-1">{format(currentDate, 'MMMM')}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleMonthChange(1)}>&gt;</Button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {days.map((day, dayIdx) => (
              <Button
                key={day.toString()}
                onClick={() => handleDateSelect(day)}
                variant="ghost"
                className={cn(
                  "h-8 w-8 p-0 font-normal",
                  !isSameMonth(day, currentDate) && "text-muted-foreground opacity-50",
                  isSameDay(day, selected as Date) && "bg-primary text-primary-foreground"
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker;