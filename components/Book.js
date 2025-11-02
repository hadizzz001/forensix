'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookYourEvent() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, location } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone || !location) return false;
    if (!emailRegex.test(email)) return false;
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
    `;
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/96176419884?text=${encoded}`;
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

    try {
      const orderRes = await fetch('/api/sendOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!orderRes.ok) throw new Error('Failed to create order.');

      const emailRes = await fetch('/api/sendEmail3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    } catch (err) {
      console.error(err);
      alert(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="mttit1232 mb-8  ">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone*"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location*"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
          rows={5}
        ></textarea>
        {error && <div className="text-red-600">{error}</div>}
          <button
            className="text-xl md:text-2xl bg-transparent text-black mybbborder border-black px-7 py-3
                 uppercase transition-colors duration-200"
          >
            <span className="inline-flex items-center gap-2">Submit</span>
          </button>
      </form>
    </div>
  );
}
