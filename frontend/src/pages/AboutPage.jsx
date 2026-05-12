import { Link } from 'react-router-dom';
import Card from '../components/Card';
import FeatureCard from '../components/FeatureCard';

const HOW_IT_WORKS = [
  {
    icon: '✍️',
    title: '1. Xabar yozing',
    description: 'Maxfiy xabaringizni yozing va uning amal qilish muddatini belgilang.',
  },
  {
    icon: '🔗',
    title: '2. Link yarating',
    description: 'Tizim sizga noyob bir martalik link yaratib beradi.',
  },
  {
    icon: '📤',
    title: '3. Linkni yuboring',
    description: 'Linkni Telegram, WhatsApp yoki email orqali kerakli shaxsga yuboring.',
  },
  {
    icon: '👁️',
    title: '4. Xabar ochiladi',
    description: 'Qabul qiluvchi linkni ochadi va xabarni bir marta ko\'radi. Shundan so\'ng xabar butunlay yo\'qoladi.',
  },
];

const FEATURES = [
  {
    icon: '🔒',
    title: 'Maxfiylik kafolati',
    description: 'Xabar ochilgandan so\'ng uning matni serverdan butunlay o\'chiriladi. Hech kim qayta o\'qiy olmaydi.',
  },
  {
    icon: '🕒',
    title: 'Vaqt nazorati',
    description: 'Xabaringizni 5 daqiqadan 7 kungacha bo\'lgan muddatga cheklashingiz mumkin.',
  },
  {
    icon: '🚫',
    title: 'Qayta ko\'rish yo\'q',
    description: 'Bir marta ochilgan xabarni qayta ko\'rish imkoniyati mavjud emas. Bu xavfsizlikni ta\'minlaydi.',
  },
  {
    icon: '🌐',
    title: 'Hech qanday ro\'yxatdan o\'tish shart emas',
    description: 'Foydalanish uchun akkaunt yaratish yoki shaxsiy ma\'lumotlarni kiritish shart emas.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Yashirin<span className="text-emerald-400">Xabar</span> qanday ishlaydi?
        </h1>
        <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
          Bir martalik maxfiy xabar almashish platformasi. Sizning xabaringiz faqat bir marta
          ko\'riladi va keyin butunlay yo\'qoladi.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-white mb-5">Ishlash tartibi</h2>
        <div className="space-y-4">
          {HOW_IT_WORKS.map((step) => (
            <FeatureCard key={step.title} {...step} />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-white mb-5">Nega aynan YashirinXabar?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Card>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25"
        >
          🔗 Birinchi xabaringizni yozish
        </Link>
      </div>
    </div>
  );
}
