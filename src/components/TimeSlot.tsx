import { motion } from "framer-motion";

interface TimeSlotProps {
  time: string;
  selected: boolean;
  onSelect: (time: string) => void;
  disabled?: boolean;
}

const TimeSlot = ({ time, selected, onSelect, disabled }: TimeSlotProps) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.05 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    onClick={() => !disabled && onSelect(time)}
    disabled={disabled}
    className={`rounded-lg px-4 py-2.5 text-sm font-medium font-body transition-all duration-200 ${
      selected
        ? "bg-gradient-gold text-primary-foreground shadow-gold"
        : disabled
        ? "border border-border bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50"
        : "border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary"
    }`}
  >
    {time}
  </motion.button>
);

export default TimeSlot;
