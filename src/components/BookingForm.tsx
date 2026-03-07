'use client';

import { useState } from 'react';
import { createAppointment } from '@/app/actions/book';

type Service = { id: string, name: string, price: number, duration: number };
type Hairstyle = { id: string, name: string };

export default function BookingForm({ 
  services, hairstyles, defaultServiceId, defaultHairstyleId 
}: { 
  services: Service[], hairstyles: Hairstyle[], defaultServiceId?: string, defaultHairstyleId?: string 
}) {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(defaultServiceId || '');
  const [hairstyleId, setHairstyleId] = useState(defaultHairstyleId || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stylist, setStylist] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedService = services.find(s => s.id === serviceId);

  const nextStep = () => {
    if (step === 1 && !serviceId && !hairstyleId) {
      setError('Please select at least one service or hairstyle');
      return;
    }
    if (step === 2 && (!date || !time)) {
      setError('Please select a date and time');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate payment processing step 3
    if (step === 3) {
      setTimeout(() => {
        // Pseudo form submission to server action
        const formData = new FormData();
        if(serviceId) formData.append('serviceId', serviceId);
        if(hairstyleId) formData.append('hairstyleId', hairstyleId);
        formData.append('stylist', stylist);
        formData.append('date', date);
        formData.append('time', time);
        
        createAppointment(formData).catch(err => {
          setError(err.message);
          setLoading(false);
        });
      }, 1500);
    }
  };

  return (
    <div className="booking-card">
      <div className="booking-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Services</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Schedule</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <form onSubmit={handleSubmit} className="booking-form">
        
        {/* Step 1: Services */}
        {step === 1 && (
          <div className="form-step">
            <h3>Select Service</h3>
            <div className="form-group">
              <label>Service</label>
              <select value={serviceId} onChange={e => setServiceId(e.target.value)} className="form-select">
                <option value="">-- Choose a Service --</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - ₹{s.price} ({s.duration} mins)</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Hairstyle Inspiration (Optional)</label>
              <select value={hairstyleId} onChange={e => setHairstyleId(e.target.value)} className="form-select">
                <option value="">-- Choose a Hairstyle --</option>
                {hairstyles.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="button" onClick={nextStep} className="btn btn-primary">Next Step</button>
            </div>
          </div>
        )}

        {/* Step 2: Schedule */}
        {step === 2 && (
          <div className="form-step">
            <h3>Choose Date & Time</h3>
            
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label>Choose Your Stylist</label>
              <div className="stylist-pills">
                <div className={`stylist-pill ${stylist === '' ? 'selected' : ''}`} onClick={() => setStylist('')}>
                  <div style={{width: 60, height: 60, borderRadius: '50%', backgroundColor: '#eee', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{fontSize: '1.5rem'}}>?</span>
                  </div>
                  <h4>Any Stylist</h4>
                  <p>First Available</p>
                </div>
                <div className={`stylist-pill ${stylist === 'Elizabeth' ? 'selected' : ''}`} onClick={() => setStylist('Elizabeth')}>
                  <img src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=400&q=80" alt="Elizabeth" />
                  <h4>Elizabeth</h4>
                  <p>Creative Dir.</p>
                </div>
                <div className={`stylist-pill ${stylist === 'Julian' ? 'selected' : ''}`} onClick={() => setStylist('Julian')}>
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" alt="Julian" />
                  <h4>Julian</h4>
                  <p>Colorist</p>
                </div>
                <div className={`stylist-pill ${stylist === 'Marcus' ? 'selected' : ''}`} onClick={() => setStylist('Marcus')}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" alt="Marcus" />
                  <h4>Marcus</h4>
                  <p>Barber</p>
                </div>
              </div>
            </div>

            <div className="form-group split" style={{ marginBottom: '2rem' }}>
              <div>
                <label>Select Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required />
              </div>
            </div>

            <div className="form-group">
              <label>Available Slots {date && `on ${date}`}</label>
              <div className="time-pills">
                {['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(t => (
                  <div 
                    key={t}
                    className={`time-pill ${time === t ? 'selected' : ''}`}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-actions split">
              <button type="button" onClick={prevStep} className="btn btn-outline">Back</button>
              <button type="button" onClick={nextStep} className="btn btn-primary">Review & Pay</button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="form-step">
            <h3>Review & Payment</h3>
            <div className="booking-summary">
              <p><strong>Service:</strong> {selectedService?.name || 'Custom Booking'}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Stylist:</strong> {stylist || 'Any Stylist'}</p>
              <div className="total-price">
                Total Due (Deposit): <span>₹{selectedService ? (selectedService.price * 0.2).toFixed(2) : '150.00'}</span>
              </div>
            </div>
            
            <div className="payment-mock">
              <p className="small-text text-gray">Mock Payment Gateway - Secure Transaction</p>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="**** **** **** ****" defaultValue="4242 4242 4242 4242" disabled />
              </div>
              <div className="form-group split">
                <div>
                  <label>Expiry</label>
                  <input type="text" defaultValue="12/25" disabled />
                </div>
                <div>
                  <label>CVC</label>
                  <input type="text" defaultValue="123" disabled />
                </div>
              </div>
            </div>

            <div className="form-actions split">
              <button type="button" onClick={prevStep} className="btn btn-outline" disabled={loading}>Back</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
