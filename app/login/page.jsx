'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage(`Welcome ${data.user.name}`);

      // ✅ Redirect using window.location
      window.location.href = '/profile';
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
      <h1 className="mttit1232 mt-20 mb-8">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4"
      >
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
        {message && <div className="text-center text-red-600">{message}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full text-xl md:text-2xl bg-transparent text-black border border-black px-7 py-3 uppercase transition-colors duration-200"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
          No account yet?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
