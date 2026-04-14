import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, User, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as {
    service: { name: string; price: number };
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
  } | null;

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-20">
          <div className="text-center">
            <p className="mb-4 text-muted-foreground font-body">No booking found.</p>
            <button
              onClick={() => navigate("/booking")}
              className="rounded-full bg-gradient-gold px-8 py-3 text-sm font-semibold text-primary-foreground font-body"
            >
              Make a Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  const details = [
    { icon: Calendar, label: "Date", value: booking.date },
    { icon: Clock, label: "Time", value: booking.time },
    { icon: User, label: "Name", value: booking.customerName },
    { icon: Phone, label: "Phone", value: booking.customerPhone },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[80vh] items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-gold"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="mb-2 text-3xl font-bold font-display">Booking Confirmed!</h1>
          <p className="mb-6 text-muted-foreground font-body">
            Your appointment for{" "}
            <span className="font-semibold text-primary">{booking.service.name}</span>{" "}
            has been booked.
          </p>

          <div className="mb-8 space-y-3 text-left">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground font-body">{label}</span>
                <span className="ml-auto text-sm font-medium text-foreground font-body">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
              <span className="text-sm font-semibold text-primary font-body">Total</span>
              <span className="text-lg font-bold text-primary font-body">${booking.service.price}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-full bg-gradient-gold py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground font-body"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
