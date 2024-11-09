'use client';

interface ContactCardProps {
  role: string;
  name: string;
  phone: string;
}

export default function ContactCard({ role, name, phone }: ContactCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = () => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between w-full">
      <div>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-lg font-medium text-gray-800">{name}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCall}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button
          onClick={handleMessage}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 