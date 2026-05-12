export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 bg-white/[0.03] border border-white/5 rounded-xl p-4">
      <span className="text-2xl shrink-0 mt-1">{icon}</span>
      <div>
        <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
