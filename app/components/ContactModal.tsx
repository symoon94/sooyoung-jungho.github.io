import { Dialog, Transition } from '@headlessui/react';
import { EnvelopeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ContactPerson {
    role: string;
    name: string;
    phone: string;
}

const contacts: ContactPerson[] = [
    { role: '신랑', name: '현정호', phone: '01020371272' },
    { role: '신랑 아버지', name: '현종권', phone: '01089601272' },
    { role: '신랑 어머니', name: '안미향', phone: '01020021272' },
    { role: '신부', name: '문수영', phone: '01094735586' },
    { role: '신부 아버지', name: '문영환', phone: '01063184959' },
    { role: '신부 어머니', name: '이동신', phone: '01063477868' },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const groomContacts = contacts.slice(0, 3); // 신랑측 연락처
    const brideContacts = contacts.slice(3, 6); // 신부측 연락처

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#4A4A4A] bg-opacity-95" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-transparent p-6 text-left align-middle transition-all">
                                {/* 닫기 버튼 */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/10"
                                >
                                    <XMarkIcon className="w-6 h-6 text-white" />
                                </button>

                                {/* 신랑측 섹션 - 상단 여백 추가 */}
                                <div className="mt-12 mb-8">
                                    <h2 className="text-white text-xl mb-4 border-b border-white/20 pb-2">
                                        <span className="font-medium mr-2">신랑측</span>
                                        <span className="text-white/60 text-base">GROOM</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {groomContacts.map((contact, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="text-white">
                                                    <div className="text-lg">{contact.role}</div>
                                                    <div className="text-xl font-medium mt-1">{contact.name}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => window.location.href = `tel:${contact.phone}`}
                                                        className="p-2 rounded-full hover:bg-white/10"
                                                    >
                                                        <PhoneIcon className="w-6 h-6 text-white" />
                                                    </button>
                                                    <button
                                                        onClick={() => window.location.href = `sms:${contact.phone}`}
                                                        className="p-2 rounded-full hover:bg-white/10"
                                                    >
                                                        <EnvelopeIcon className="w-6 h-6 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 신부측 */}
                                <div>
                                    <h2 className="text-white text-xl mb-4 border-b border-white/20 pb-2">
                                        <span className="font-medium mr-2">신부측</span>
                                        <span className="text-white/60 text-base">BRIDE</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {brideContacts.map((contact, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="text-white">
                                                    <div className="text-lg">{contact.role}</div>
                                                    <div className="text-xl font-medium mt-1">{contact.name}</div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => window.location.href = `tel:${contact.phone}`}
                                                        className="p-2 rounded-full hover:bg-white/10"
                                                    >
                                                        <PhoneIcon className="w-6 h-6 text-white" />
                                                    </button>
                                                    <button
                                                        onClick={() => window.location.href = `sms:${contact.phone}`}
                                                        className="p-2 rounded-full hover:bg-white/10"
                                                    >
                                                        <EnvelopeIcon className="w-6 h-6 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
} 