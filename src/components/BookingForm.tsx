import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import ServiceCard from "@/components/ServiceCard";
import TimeSlot from "@/components/TimeSlot";
import { services, timeSlots, type Service } from "@/data/services";
import axios from "axios";

interface BookingFormProps {
  initialService?: Service | null;
  onSubmit: (data: {
    service: Service;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
  }) => void;
}

const BookingForm = ({ initialService, onSubmit }: BookingFormProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(
    initialService || null
  );
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const disabledSlots = ["12:00 PM", "12:30 PM", "4:30 PM"];

  const canSubmit = selectedService && date && selectedTime && name && phone;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const { id, ...serviceWithoutId } = selectedService;
    const val = {
      service: serviceWithoutId,
      date: format(date, "PPP"),
      time: selectedTime.replace(/AM|PM/, "").trim(),
      customerName: name,
      customerPhone: phone,
    };
    try {
      const response = await axios.post(
        "http://localhost:8082/api/booking",
        val
      );
      console.log("Booking successful:", response.data);
      // Optionally, call onSubmit or handle success
      onSubmit(response.data);
    } catch (error) {
      console.error("Error submitting booking:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-10">
      {/* Service Selection */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <h2 className="mb-4 text-2xl font-display font-semibold text-foreground">
          Select a Service
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              selected={selectedService?.id === s.id}
              onSelect={setSelectedService}
            />
          ))}
        </div>
      </motion.section>

      {/* Date Selection */}
      {selectedService && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="mb-4 text-2xl font-display font-semibold text-foreground">
            Pick a Date
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex w-full max-w-sm items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left font-body transition-all hover:border-primary/50",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-5 w-5 text-primary" />
                {date ? format(date, "PPP") : "Choose a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </motion.section>
      )}

      {/* Time Selection */}
      {date && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="mb-4 text-2xl font-display font-semibold text-foreground">
            Choose a Time
          </h2>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((t) => (
              <TimeSlot
                key={t}
                time={t}
                selected={selectedTime === t}
                onSelect={setSelectedTime}
                disabled={disabledSlots.includes(t)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* Customer Details */}
      {selectedTime && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="mb-4 text-2xl font-display font-semibold text-foreground">
            Your Details
          </h2>
          <div className="grid max-w-md gap-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-border bg-card font-body"
            />
            <Input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border-border bg-card font-body"
            />
          </div>
        </motion.section>
      )}

      {/* Submit */}
      {canSubmit && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={handleSubmit}
            className="rounded-full bg-gradient-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:opacity-90 shadow-gold font-body"
          >
            Confirm Booking
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BookingForm;
