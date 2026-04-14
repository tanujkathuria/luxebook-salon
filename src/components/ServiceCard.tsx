import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
  selected?: boolean;
  onSelect?: (service: Service) => void;
}

const ServiceCard = ({ service, onBook, selected, onSelect }: ServiceCardProps) => {
  const handleClick = () => {
    if (onSelect) onSelect(service);
    else if (onBook) onBook(service);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`group cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
        selected
          ? "border-primary bg-primary/10 shadow-gold"
          : "border-border bg-card hover:border-primary/40 hover:shadow-gold"
      }`}
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary font-body">
        {service.category}
      </div>
      <h3 className="mb-2 text-xl font-display font-semibold text-foreground">
        {service.name}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground font-body">
        {service.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">${service.price}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {service.duration} min
          </span>
        </div>
        {onBook && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook(service);
            }}
            className="rounded-full bg-gradient-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:opacity-90 font-body"
          >
            Book Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
