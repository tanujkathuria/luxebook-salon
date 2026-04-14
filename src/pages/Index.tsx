import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";
import { services, type Service } from "@/data/services";

const Index = () => {
  const navigate = useNavigate();

  const handleBook = (service: Service) => {
    navigate("/booking", { state: { service } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-6 flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] font-body">
              Premium Salon Experience
            </span>
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight font-display md:text-7xl">
            Where Beauty
            <br />
            <span className="text-gradient-gold">Meets Artistry</span>
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground font-body">
            Indulge in bespoke treatments crafted by world-class stylists in an atmosphere of refined elegance.
          </p>
          <button
            onClick={() => navigate("/booking")}
            className="rounded-full bg-gradient-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-gold transition-all hover:opacity-90 font-body"
          >
            Book Your Visit
          </button>
        </motion.div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold font-display md:text-4xl">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground font-body">
            Curated treatments for the discerning individual
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ServiceCard service={service} onBook={handleBook} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground font-body">
        © 2026 Lumière Salon. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
