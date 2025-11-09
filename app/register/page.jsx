'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // ✅ initialize router

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setMessage(data.error || 'Registered successfully!');

      if (!data.error) {
        setForm({ name: '', email: '', password: '' });

        // ✅ Redirect after successful register
        setTimeout(() => {
          router.push('/login');
        }, 800); // small delay so user sees the success message
      }
    } catch (err) {
      setMessage('Something went wrong.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="mttit1232 mt-20 mb-8">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none transition"
        />

        {message && (
          <div className={`text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full text-xl md:text-2xl bg-transparent text-black border border-black px-7 py-3 uppercase transition-colors duration-200"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Have account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
