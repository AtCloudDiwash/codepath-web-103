import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl mb-4">💡</p>
      <h1 className="text-4xl font-bold text-amber-400 mb-3">404 — Page Not Found</h1>
      <p className="text-slate-400 mb-8">Looks like this lamp doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-amber-300 transition"
      >
        Go Home
      </button>
    </div>
  );
}
