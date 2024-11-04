"use client";

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

export default function RsvpDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const timestamp = new Date().toISOString();
    const content = {
      name,
      attendance,
      numberOfGuests: attendance === 'yes' ? numberOfGuests : 0,
      message,
      submittedAt: timestamp
    };

    try {
      const response = await fetch(`https://api.github.com/repos/sooyoung-jungho/sooyoung-jungho.github.io/contents/rsvp/${timestamp}.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `RSVP submission from ${name}`,
          content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
          branch: 'main'
        })
      });

      if (!response.ok) {
        throw new Error('제출 중 오류가 발생했습니다');
      }

      alert('참석 여부가 성공적으로 제출되었습니다. 감사합니다.');
      setIsOpen(false);
      setName('');
      setAttendance('');
      setNumberOfGuests(1);
      setMessage('');
    } catch (error) {
      console.error('Failed to submit RSVP:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-xl">
          <Dialog.Title className="text-2xl font-medium text-gray-900 mb-4 text-center">
            초대합니다
          </Dialog.Title>

          <div className="text-gray-600 text-center mb-6 space-y-4">
            <p>이 초대장을 보고 있는 당신!</p>
            <p>당신은 저희 두 사람의 인생에 중요한 분이예요.</p>
            <p>초대드릴 수 있어 감사하고 기쁜 마음입니다.</p>
            <div className="border-t border-gray-200 my-4" />
            <p className="text-sm">
              본 RSVP는 모자르지 않게 음식을 준비하기 위함이니<br />
              너무 부담갖지 않으셔도 됩니다 :)<br />
              참석이 어려우셔도 축하해주시는 마음으로 충분히 감사합니다.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-center text-gray-700">
              <span className="block font-medium">시간</span>
              2025년 2월 16일 일요일 오후 2시
            </p>
            <p className="text-center text-gray-700 mt-2">
              <span className="block font-medium">장소</span>
              노블발렌티 대치
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                성함
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                placeholder="성함을 입력해 주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                참석 여부
              </label>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">선택해 주세요</option>
                <option value="yes">참석하겠습니다</option>
                <option value="no">아쉽게도 참석이 어렵습니다</option>
              </select>
            </div>

            {attendance === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  참석 인원
                </label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  본인 포함 최대 4인까지 가능합니다
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                축하 메시지
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                placeholder="축하 메시지를 남겨주세요 (선택사항)"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                나중에 하기
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                제출하기
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}