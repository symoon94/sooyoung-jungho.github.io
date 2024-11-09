'use client';

import { useState } from 'react';

export default function LocationInfo() {
    const [activeTab, setActiveTab] = useState('parking');

    return (
        <div className="w-full max-w-md mx-auto px-4 korean-font">
            <div className="flex border-b border-gray-200">
                <button
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'parking'
                        ? 'border-b-2 border-green-800 text-green-800'
                        : 'text-gray-500'
                        }`}
                    onClick={() => setActiveTab('parking')}
                >
                    주차안내
                </button>
                <button
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'transport'
                        ? 'border-b-2 border-green-800 text-green-800'
                        : 'text-gray-500'
                        }`}
                    onClick={() => setActiveTab('transport')}
                >
                    교통안내
                </button>
            </div>

            <div className="py-4">
                {activeTab === 'parking' && (
                    <div className="text-sm text-gray-600 space-y-2">
                        <p>2시간 무료</p>
                        <p className="text-xs">* 추가 10분당 1,000원</p>
                    </div>
                )}
                {activeTab === 'transport' && (
                    <div className="text-sm text-gray-600 space-y-6">
                        <div>
                            <p className="font-medium mb-2">자가용 이용</p>
                            <p>네비게이션: &ldquo;노블발렌티 대치&rdquo; 또는</p>
                            <p>&ldquo;서울시 강남구 영동대로 325&rdquo; 검색</p>
                        </div>

                        <div>
                            <p className="font-medium mb-2">지하철 이용</p>
                            <p>2호선 삼성역 3번 출구 하차 (도보 10분)</p>
                            <p className="text-xs mt-1">* 삼성역에서 셔틀버스 수시 운행</p>
                        </div>

                        <div>
                            <p className="font-medium mb-2">버스 이용</p>
                            <p className="mb-2">휘문고, 대치2동 주민센터 정거장 하차</p>
                            <div className="space-y-1 text-xs">
                                <p><span className="font-medium">간선</span>: 401</p>
                                <p><span className="font-medium">지선</span>: 4318, 4319, 4419</p>
                                <p><span className="font-medium">일반</span>: 11-3, 917</p>
                                <p><span className="font-medium">직행</span>: 500-2, 9407, 9507, 9607</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 