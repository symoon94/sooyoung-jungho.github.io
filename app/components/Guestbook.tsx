'use client';

import { useEffect, useState } from 'react';

interface GuestbookEntry {
    name: string;
    message: string;
    submittedAt: string;
}

export default function Guestbook() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);

    const maskName = (name: string) => {
        if (name.length === 1) return name;
        if (name.length === 2) return name[0] + '*';

        const maskLength = Math.floor(name.length / 3);
        const maskStart = Math.floor((name.length - maskLength) / 2);

        return (
            name.slice(0, maskStart) +
            '*'.repeat(maskLength) +
            name.slice(maskStart + maskLength)
        );
    };

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/sooyoung-jungho/sooyoung-jungho.github.io/contents/rsvp');
                const files = await response.json();

                const entriesPromises = files.map(async (file: { download_url: string }) => {
                    const entryResponse = await fetch(file.download_url);
                    const entry = await entryResponse.json();
                    return {
                        name: entry.name,
                        message: entry.message,
                        submittedAt: entry.submittedAt
                    };
                });

                const entriesData = await Promise.all(entriesPromises);
                const sortedEntries = entriesData.sort((a, b) =>
                    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
                );
                setEntries(sortedEntries);
            } catch (error) {
                console.error('Failed to fetch guestbook entries:', error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div className="w-full max-w-md mx-auto korean-text">
            <div className="text-center mb-8">
                <div
                    className="inline-block border border-green-800 px-8 py-2 text-green-800 italic"
                    style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}
                >
                    guestbook
                </div>
            </div>

            <div className="text-gray-600 mb-8 italic text-balance space-y-4 text-center">
                <p>&ldquo;소중한 축하의 마음을</p>
                <p>남겨주셔서 감사합니다.&rdquo;</p>
            </div>

            <div className="space-y-6">
                {entries.map((entry, index) => (
                    <div
                        key={index}
                        className="bg-white/80 rounded-lg p-6 shadow-sm border border-green-800/10"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-green-800">{entry.name}</span>
                            <span className="text-xs text-gray-500">
                                {new Date(entry.submittedAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-600 whitespace-pre-wrap">{entry.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 