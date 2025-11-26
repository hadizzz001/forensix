'use client';
import { useState, useEffect } from 'react';

export default function BookYourEvent() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/apoint');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, location } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone || !location) return false;
    if (!emailRegex.test(email)) return false;
    if (!selectedDate || !selectedHour) return false; // ensure date & hour selected
    return true;
  };

  const createWhatsAppURL = (data) => {
    const { name, email, phone, location, subject, message } = data;
    const msg = `
*New Event Booking Request:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Subject: ${subject || '-'}
Message: ${message || '-'}
Date: ${selectedDate}
Time: ${selectedHour}
    `;
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/96181422889?text=${encoded}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill all required fields correctly.');
      return;
    }
    setError('');
    setLoading(true);

    const whatsappUrl = createWhatsAppURL(formData);
    window.open(whatsappUrl, '_blank');



    const meetLink = "https://us05web.zoom.us/j/8985808054?pwd=aAGGVitVIh8k0kE2z4noqMJfxoa2Pr.1";









    try {
      const orderRes = await fetch('/api/sendOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: selectedDate, time: selectedHour, meet: meetLink }),
      });
      if (!orderRes.ok) throw new Error('Failed to create order.');

      const emailRes = await fetch('/api/sendEmail3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: {
            ...formData,
            date: selectedDate,
            time: selectedHour,
            meet: meetLink
          }
        }),
      });

      if (!emailRes.ok) throw new Error('Failed to send email.');

      alert('Your request has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        subject: '',
        message: '',
      });
      setSelectedDate('');
      setSelectedHour('');


    } catch (err) {
      console.error(err);
      alert(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }













  };

  // Helper to get hours for selected date
  const getAvailableHours = () => {
    if (!selectedDate) return [];
    const dateObj = appointments.find(appt =>
      appt.info.dates.some(d => new Date(d.date).toISOString().slice(0, 10) === selectedDate)
    );
    if (!dateObj) return [];
    const dateData = dateObj.info.dates.find(d => new Date(d.date).toISOString().slice(0, 10) === selectedDate);
    return dateData.hours || [];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="mttit1232 mb-8">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" />
        <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" />
        <input type="tel" name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" />
        <input type="text" name="location" placeholder="Location*" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded" rows={5}></textarea>

        {/* Calendar Section */}
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Select Date*</label>
          <select value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setSelectedHour(''); }} className="w-full p-3 border border-gray-300 rounded">
            <option value="">-- Select Date --</option>
            {appointments.flatMap(appt => appt.info.dates).map(d => (
              <option key={d.date} value={new Date(d.date).toISOString().slice(0, 10)}>
                {new Date(d.date).toDateString()}
              </option>
            ))}
          </select>

          <label className="font-semibold">Select Time*</label>
          <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)} className="w-full p-3 border border-gray-300 rounded" disabled={!selectedDate}>
            <option value="">-- Select Time --</option>
            {getAvailableHours().map(h => (
              <option key={h.hour} value={h.hour} disabled={h.booked}>
                {h.hour} {h.booked ? '(Booked)' : ''}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <button className="text-xl md:text-2xl bg-transparent text-black mybbborder border-black px-7 py-3 uppercase transition-colors duration-200">
          <span className="inline-flex items-center gap-2">{loading ? 'Submitting...' : 'Submit'}</span>
        </button>
      </form>
    </div>
  );
}
