import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, CalendarX } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { Booking } from "@/data/services";
import axios from "axios";

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
  //   setBookings(stored);
  // }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/booking`
        ); // Use dynamic base URL); // Replace with your API endpoint
        setBookings(response.data); // Store the fetched data in state
      } catch (err) {
        console.error("Error fetching bookings:", err);
        // setError("Failed to fetch bookings.");
      } finally {
        // setLoading(false); // Stop loading indicator
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2 text-4xl font-bold font-display">
            Admin <span className="text-gradient-gold">Dashboard</span>
          </h1>
          <p className="mb-8 text-muted-foreground font-body">
            Manage all salon bookings
          </p>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
            <CalendarX className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground font-body">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border p-5 transition-all ${
                  booking.status === "cancelled"
                    ? "border-destructive/30 bg-destructive/5 opacity-60"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold font-display text-foreground">
                      {booking.service.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground font-body">
                      <span>{booking.date}</span>
                      <span>•</span>
                      <span>{booking.time}</span>
                      <span>•</span>
                      <span>{booking.customerName}</span>
                      <span>•</span>
                      <span>{booking.customerPhone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold font-body ${
                        booking.status === "confirmed"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {booking.status}
                    </span>
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                      >
                        <CalendarX className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
