
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { toast } from "sonner";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const ConsultationForm = ({ isOpen, onClose }: ConsultationFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Consultation scheduled!", {
        description: `We'll contact you at ${email} to confirm your appointment for ${date} at ${time}.`
      });
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setDate('');
    setTime('');
  };

  // Generate the next 14 days as available dates
  const availableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
        const formattedDate = nextDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short', 
          day: 'numeric'
        });
        dates.push(formattedDate);
      }
    }
    
    return dates;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Schedule a Consultation</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for an AEO consultation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aeo-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aeo-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aeo-500"
                placeholder="Your company (optional)"
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-aeo-500" /> 
              Select a Date
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableDates().map((availableDate) => (
                <div key={availableDate}>
                  <input
                    type="radio"
                    id={`date-${availableDate}`}
                    name="date"
                    value={availableDate}
                    className="sr-only"
                    required
                    checked={date === availableDate}
                    onChange={() => setDate(availableDate)}
                  />
                  <label
                    htmlFor={`date-${availableDate}`}
                    className={`block w-full text-center px-3 py-2 border ${
                      date === availableDate ? 'bg-aeo-50 border-aeo-500 text-aeo-700' : 'border-gray-300'
                    } rounded-md cursor-pointer hover:bg-gray-50 text-sm`}
                  >
                    {availableDate}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-aeo-500" /> 
              Select a Time
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot}>
                  <input
                    type="radio"
                    id={`time-${timeSlot}`}
                    name="time"
                    value={timeSlot}
                    className="sr-only"
                    required
                    checked={time === timeSlot}
                    onChange={() => setTime(timeSlot)}
                  />
                  <label
                    htmlFor={`time-${timeSlot}`}
                    className={`block w-full text-center px-2 py-2 border ${
                      time === timeSlot ? 'bg-aeo-50 border-aeo-500 text-aeo-700' : 'border-gray-300'
                    } rounded-md cursor-pointer hover:bg-gray-50 text-sm`}
                  >
                    {timeSlot}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="bg-aeo hover:bg-aeo-600 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
