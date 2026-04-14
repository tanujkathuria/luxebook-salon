import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import type { Service } from "@/data/services";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialService = (location.state as { service?: Service })?.service || null;

  const handleSubmit = (data: {
    service: Service;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
  }) => {
    // Mock save — store in localStorage for admin view
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    const booking = {
      id: crypto.randomUUID(),
      ...data,
      status: "confirmed" as const,
    };
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    navigate("/confirmation", { state: booking });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-4xl font-bold font-display">
            Book an <span className="text-gradient-gold">Appointment</span>
          </h1>
          <p className="mb-10 text-muted-foreground font-body">
            Choose your service and preferred time
          </p>
        </motion.div>
        <BookingForm initialService={initialService} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Booking;
