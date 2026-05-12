import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { revealMessageByUrl } from '../api/messageApi';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RevealMessagePage() {
  const { token } = useParams();
  const [step, setStep] = useState('confirm');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReveal = async () => {
    setLoading(true);
    setError('');

    const url = window.location.href;

    try {
      const response = await revealMessageByUrl(url);
      setContent(response.data);
      setStep('revealed');
    } catch (err) {
      setError(err.message);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="text-center space-y-6">
          <div className="text-6xl">🔐</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Maxfiy xabar kelib tushdi
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Bu xabar faqat bir marta ochiladi. Ochish tugmasini bossangiz, u qayta ko'rinmaydi.
          </p>

          <Button
            onClick={handleReveal}
            loading={loading}
            size="lg"
            className="w-full"
          >
            {loading ? 'Ochilmoqda...' : '👁️ Xabarni ochish'}
          </Button>

          <Link
            to="/"
            className="block text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            ← Bosh sahifaga qaytish
          </Link>
        </Card>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="text-center space-y-4 py-12">
          <LoadingSpinner size="lg" />
          <p className="text-white/50 text-sm">Xabar ochilmoqda...</p>
        </Card>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="text-center space-y-6">
          <div className="text-6xl">😔</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Xabarni ochib bo'lmadi
          </h2>

          <div className="bg-red-600/20 border border-red-500/40 rounded-xl px-4 py-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>

          <Link to="/">
            <Button variant="secondary">Yangi xabar yaratish</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card className="space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-4">📩</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Xabar ochildi
          </h2>
          <p className="text-white/40 text-sm mt-1">
            Bu xabar endi bir marta ko'rilgan va qayta ochilmaydi.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <p className="text-white text-base whitespace-pre-wrap leading-relaxed break-words">
            {content}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button variant="primary" className="w-full">
              ✏️ Yangi xabar yaratish
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
