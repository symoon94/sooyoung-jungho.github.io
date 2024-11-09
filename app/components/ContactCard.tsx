'use client';
import PhoneIcon from './PhoneIcon';

interface ContactCardProps {
  name: string;
  relation?: string;
  phone: string;
  isParent?: boolean;
}

export default function ContactCard({ name, relation, phone, isParent = false }: ContactCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="flex flex-col items-start gap-1 text-gray-700">
      <span className="font-serif text-lg">{name}</span>
      {isParent && (
        <button
          onClick={handleCall}
          className="flex items-center gap-1 text-sm text-green-800"
        >
          <PhoneIcon />
          <span>{relation}</span>
        </button>
      )}
    </div>
  );
} 