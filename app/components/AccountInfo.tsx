'use client';

import { useState } from 'react';

interface Account {
    bank: string;
    owner: string;
    number: string;
}

interface AccountGroupProps {
    title: string;
    accounts: Account[];
}

function AccountGroup({ title, accounts }: AccountGroupProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            <div className="space-y-3">
                {accounts.map((account, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">{account.bank} (예금주: {account.owner})</p>
                        <div className="flex justify-between items-center mt-1">
                            <p className="font-medium text-gray-800">{account.number}</p>
                            <button
                                onClick={() => navigator.clipboard.writeText(account.number)}
                                className="px-4 py-1 text-sm bg-green-800 text-white rounded hover:bg-green-700 transition-colors"
                            >
                                복사
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AccountInfo() {
    const [isOpen, setIsOpen] = useState(false);

    const groomAccounts = [
        { bank: '신한은행', owner: '현정호', number: '??' },
    ];

    const groomParentsAccounts = [
        { bank: '??', owner: '현종권', number: '??' },
    ];

    const brideAccounts = [
        { bank: '국민은행', owner: '문수영', number: '96722786837' },
    ];

    const brideParentsAccounts = [
        { bank: '국민은행', owner: '이동신', number: '??' },
    ];

    return (
        <div className="w-full max-w-md mx-auto px-4 h-full flex flex-col">
            <div className="mt-16 mb-2 text-center text-gray-400 text-sm">
                <p>축하의 마음을 전하고 싶으신 분들을 위해</p>
                <p>계좌번호를 기재하였습니다</p>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 bg-green-800/90 text-white rounded-lg mb-6 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
                <span>신랑 신부에게 마음 전하기</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
                <div className="space-y-8 animate-fade-in overflow-y-auto flex-1 pb-6">
                    <div className="space-y-8">
                        <AccountGroup title="신랑에게" accounts={groomAccounts} />
                        <AccountGroup title="신랑측 혼주에게" accounts={groomParentsAccounts} />
                    </div>

                    <div className="space-y-8">
                        <AccountGroup title="신부에게" accounts={brideAccounts} />
                        <AccountGroup title="신부측 혼주에게" accounts={brideParentsAccounts} />
                    </div>
                </div>
            )}
        </div>
    );
} 