'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AccountInfo() {
    const [showGroomAccount, setShowGroomAccount] = useState(false);
    const [showBrideAccount, setShowBrideAccount] = useState(false);

    const handleCopy = async (accountNumber: string) => {
        try {
            await navigator.clipboard.writeText(accountNumber);
            toast.success('계좌번호가 복사되었습니다');
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('계좌번호 복사에 실패했습니다');
        }
    };

    return (
        <div className="w-full max-w-md space-y-6 korean-text">
            <div className="space-y-4">
                {/* 신랑측 계좌 버튼 */}
                <div className="flex justify-center w-full">
                    <button
                        onClick={() => setShowGroomAccount(!showGroomAccount)}
                        className="w-4/5 py-2.5 px-4 border border-green-800/30 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                        <span>신랑측</span>
                        <ChevronDownIcon
                            className={`w-5 h-5 transition-transform duration-200 ${showGroomAccount ? 'transform rotate-180' : ''
                                }`}
                        />
                    </button>
                </div>

                {/* 신랑측 계좌 정보 */}
                <div className={`flex justify-center w-full transition-all duration-300 ease-in-out overflow-hidden ${showGroomAccount ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="w-4/5 space-y-3">
                        {/* 신랑 계좌 */}
                        <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                                <div>
                                    <p className="text-sm text-gray-400">예금주: 현정호</p>
                                    <p className="text-sm text-gray-500">농협 123-4567-8901-23</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleCopy('1234567890123')}
                                        className="w-[50px] px-1 h-5 text-[11px] text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        복사하기
                                    </button>
                                    <a
                                        href="https://qr.kakaopay.com/신랑QR코드"
                                        className="block w-[50px] flex justify-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/kpbtn.svg"
                                            alt="카카오페이"
                                            width={20}
                                            height={16}
                                            className="h-[18px] w-auto"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 신랑 어머니 계좌 */}
                        <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                                <div>
                                    <p className="text-sm text-gray-400">예금주: 안미향</p>
                                    <p className="text-sm text-gray-500">신한 123-456-789012</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleCopy('123456789012')}
                                        className="w-[50px] px-1 h-5 text-[11px] text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        복사하기
                                    </button>
                                    <a
                                        href="https://qr.kakaopay.com/신랑어머니QR코드"
                                        className="block w-[50px] flex justify-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/kpbtn.svg"
                                            alt="카카오페이"
                                            width={20}
                                            height={16}
                                            className="h-[18px] w-auto"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* 신부측 계좌 버튼 */}
                <div className="flex justify-center w-full">
                    <button
                        onClick={() => setShowBrideAccount(!showBrideAccount)}
                        className="w-4/5 py-2.5 px-4 border border-green-800/30 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                        <span>신부측</span>
                        <ChevronDownIcon
                            className={`w-5 h-5 transition-transform duration-200 ${showBrideAccount ? 'transform rotate-180' : ''
                                }`}
                        />
                    </button>
                </div>

                {/* 신부측 계좌 정보 */}
                <div className={`flex justify-center w-full transition-all duration-300 ease-in-out overflow-hidden ${showBrideAccount ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="w-4/5 space-y-3">
                        {/* 신부측도 동일한 포맷으로 수정 */}
                        <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                                <div>
                                    <p className="text-sm text-gray-400">예금주: 문수영</p>
                                    <p className="text-sm text-gray-500">국민 96722786837</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleCopy('96722786837')}
                                        className="w-[50px] px-1 h-5 text-[11px] text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        복사하기
                                    </button>
                                    <a
                                        href="https://qr.kakaopay.com/Ej7z8mV13"
                                        className="block w-[50px] flex justify-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/kpbtn.svg"
                                            alt="카카오페이"
                                            width={20}
                                            height={16}
                                            className="h-[18px] w-auto"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                                <div>
                                    <p className="text-sm text-gray-400">예금주: 문영환</p>
                                    <p className="text-sm text-gray-500">우리 123-456-789012</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleCopy('123456789012')}
                                        className="w-[50px] px-1 h-5 text-[11px] text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        복사하기
                                    </button>
                                    <a
                                        href="https://qr.kakaopay.com/신부아버지QR코드"
                                        className="block w-[50px] flex justify-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/kpbtn.svg"
                                            alt="카카오페이"
                                            width={20}
                                            height={16}
                                            className="h-[18px] w-auto"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                            <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                                <div>
                                    <p className="text-sm text-gray-400">예금주: 이동신</p>
                                    <p className="text-sm text-gray-500">하나 123-456-789012</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleCopy('123456789012')}
                                        className="w-[50px] px-1 h-5 text-[11px] text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        복사하기
                                    </button>
                                    <a
                                        href="https://qr.kakaopay.com/신부어머니QR코드"
                                        className="block w-[50px] flex justify-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/kpbtn.svg"
                                            alt="카카오페이"
                                            width={20}
                                            height={16}
                                            className="h-[18px] w-auto"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 