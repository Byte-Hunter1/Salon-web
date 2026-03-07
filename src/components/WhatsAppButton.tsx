'use client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '15551234567';
  const defaultMessage = 'Hi, I want to book an appointment.';
  
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <button 
      onClick={handleClick} 
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
}
