export interface Service {
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: string;
}

export const services: Service[] = [
  {
    id: "1",
    name: "Luxury Haircut",
    description: "Precision cut tailored to your face shape",
    price: 85,
    duration: 45,
    category: "Hair",
  },
  {
    id: "2",
    name: "Color & Highlights",
    description: "Full color or balayage with premium products",
    price: 180,
    duration: 120,
    category: "Hair",
  },
  {
    id: "3",
    name: "Blowout & Styling",
    description: "Voluminous blowout with heat protection",
    price: 65,
    duration: 40,
    category: "Hair",
  },
  {
    id: "4",
    name: "Deep Conditioning",
    description: "Intensive repair treatment for damaged hair",
    price: 95,
    duration: 60,
    category: "Treatment",
  },
  {
    id: "5",
    name: "Bridal Package",
    description: "Complete bridal hair and makeup styling",
    price: 350,
    duration: 180,
    category: "Special",
  },
  {
    id: "6",
    name: "Beard Sculpting",
    description: "Professional beard shaping and grooming",
    price: 45,
    duration: 30,
    category: "Grooming",
  },
];

export interface Booking {
  id: string;
  service: Service;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  status: "confirmed" | "cancelled" | "completed";
}

export const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];
