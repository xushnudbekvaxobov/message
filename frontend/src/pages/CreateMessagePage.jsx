import { useState } from 'react';
import { createMessage } from '../api/messageApi';
import { copyToClipboard } from '../utils/copyToClipboard';
import { formatDate } from '../utils/formatDate';
import Card from '../components/Card';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Alert from '../components/Alert';
import FeatureCard from '../components/FeatureCard';

const EXPIRY_OPTIONS = [
  { value: 5, label: '5 daqiqa' },
  { value: 60, label: '1 soat' },
  { value: 1440, label: '24 soat' },
  { value: 10080, label: '7 kun' },
];

const FEATURES = [
  {
    icon: '👁️',
    title: 'Bir martalik ochish',
    description: 'Xabar faqat bir marta ko\'riladi. Keyingi ochishda u butunlay yo\'qoladi.',
  },
  {
    icon: '⏱️',
    title: 'Vaqt chegarasi',
    description: 'Xabarning amal qilish muddatini o\'zingiz belgilaysiz. Muddat tugagach avtomatik o\'chadi.',
  },
  {
    icon: '🔒',
    title: 'Content yashiriladi',
    description: 'Xabar ochilgandan so\'ng uning matni tizimdan butunlay o\'chiriladi.',
  },
];

export default function CreateMessagePage() {
  const [content, setContent] = useState('');
  const [expiresInMinutes, setExpiresInMinutes] = useState(60);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const contentError = content.trim()
    ? ''
    : 'Xabar matnini kiriting';

  const isValid = content.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await createMessage({ content, expiresInMinutes });
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(result.link);
      setAlert({ show: true, message: 'Link nusxalandi!', type: 'success' });
    } catch {
      setAlert({ show: true, message: 'Nusxalashda xatolik', type: 'error' });
    }
  };

  const handleReset = () => {
    setContent('');
    setExpiresInMinutes(60);
    setResult(null);
    setError('');
  };

  const telegramShareUrl = result
    ? `https://t.me/share/url?url=${encodeURIComponent(result.link)}&text=${encodeURIComponent('Menga maxfiy xabar yuborishdi. Ochish uchun link:')}`
    : '';

  if (result) {
    return (
      <div className="max-w-lg mx-auto">
        <Alert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false })}
        />

        <Card className="text-center space-y-6">
          <div className="text-5xl">✅</div>
          <h2 className="text-2xl font-bold text-white">Link yaratildi!</h2>
          <p className="text-white/50 text-sm">
            Quyidagi linkni istalgan shaxsga yuboring. Xabar faqat bir marta ochiladi.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 break-all">
            <code className="text-emerald-400 text-sm font-mono">{result.link}</code>
          </div>

          {result.expiresAt && (
            <p className="text-white/40 text-xs">
              Amal qilish muddati: {formatDate(result.expiresAt)}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleCopyLink} className="flex-1">
              📋 Linkni nusxalash
            </Button>
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="secondary" className="w-full">
                ✈️ Telegram'da yuborish
              </Button>
            </a>
          </div>

          <Button variant="ghost" onClick={handleReset} className="text-sm">
            Yangi xabar yaratish
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <section className="space-y-6 lg:sticky lg:top-24">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Maxfiy xabarni{' '}
            <span className="text-emerald-400">bir martalik link</span> orqali yuboring
          </h1>
          <p className="mt-4 text-white/50 text-base sm:text-lg leading-relaxed">
            Xabar ochilgandan keyin qayta ko'rinmaydi. Telegram, WhatsApp yoki email orqali xavfsiz
            link yuboring.
          </p>
        </div>

        <div className="space-y-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-semibold text-white">Yangi maxfiy xabar</h2>

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Maxfiy xabaringizni yozing..."
              error={error && !content.trim() ? contentError : ''}
              disabled={loading}
            />

            <div className="space-y-2">
              <label className="text-sm text-white/60">Amal qilish muddati</label>
              <Select
                value={expiresInMinutes}
                onChange={(e) => setExpiresInMinutes(Number(e.target.value))}
                options={EXPIRY_OPTIONS}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-500/40 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" loading={loading} disabled={!isValid} className="w-full">
              {loading ? 'Yaratilmoqda...' : '🔗 Link yaratish'}
            </Button>

            <p className="text-white/30 text-xs text-center">
              ⚠️ Linkni o'zingiz ochsangiz ham xabar ko'rilgan hisoblanadi.
            </p>
          </form>
        </Card>
      </section>
    </div>
  );
}
