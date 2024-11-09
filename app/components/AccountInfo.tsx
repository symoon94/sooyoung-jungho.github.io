'use client';

import { useState } from 'react';
import KakaoPayButton from './KakaoPayButton';

export default function AccountInfo() {
    const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

    return (
        <div className="w-full max-w-md space-y-6 px-4">
            <h2 className="text-xl font-medium text-center mb-8 text-gray-800">
                마음 전하실 곳
            </h2>

            {/* 탭 버튼 */}
            <div className="flex space-x-2 mb-6">
                <button
                    className={`flex-1 py-2 rounded-md transition-colors ${activeTab === 'groom'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    onClick={() => setActiveTab('groom')}
                >
                    신랑측
                </button>
                <button
                    className={`flex-1 py-2 rounded-md transition-colors ${activeTab === 'bride'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    onClick={() => setActiveTab('bride')}
                >
                    신부측
                </button>
            </div>

            {/* 신랑측 계좌정보 */}
            {activeTab === 'groom' && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <p className="text-gray-600">현정호</p>
                                <p className="text-gray-500 text-sm">농협 123-4567-8901-23</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('1234567890123');
                                    }}
                                >
                                    복사
                                </button>
                                <KakaoPayButton href="https://qr.kakaopay.com/Ej7z8mV13" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <p className="text-gray-600">아버지 현종권</p>
                                <p className="text-gray-500 text-sm">농협 123-4567-8901-23</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('1234567890123');
                                    }}
                                >
                                    복사
                                </button>
                                <KakaoPayButton href="https://qr.kakaopay.com/Ej7z8mV13" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <p className="text-gray-600">어머니 안미향</p>
                                <p className="text-gray-500 text-sm">농협 123-4567-8901-23</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('1234567890123');
                                    }}
                                >
                                    복사
                                </button>
                                <KakaoPayButton href="https://qr.kakaopay.com/Ej7z8mV13" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 신부측 계좌정보 */}
            {activeTab === 'bride' && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <p className="text-gray-600">문수영</p>
                                <p className="text-gray-500 text-sm">국민 96722786837</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('96722786837');
                                    }}
                                >
                                    복사
                                </button>
                                <KakaoPayButton href="https://qr.kakaopay.com/Ej7z8mV13" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <p className="text-gray-600">아버지 문영환</p>
                                <p className="text-gray-500 text-sm">농협 123-4567-8901-23</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('1234567890123');
                                    }}
                                >
                                    복사
                                </button>
                                <KakaoPayButton href="https://qr.kakaopay.com/Ej7z8mV13" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <p className="text-gray-600">어머니 이동신</p>
                                <p className="text-gray-500 text-sm">농협 123-4567-8901-23</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('1234567890123');
                                    }}
                                >
                                    복사
                                </button>
                                <KakaoPayButton href="https://qr.kakaopay.com/Ej7z8mV13" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 