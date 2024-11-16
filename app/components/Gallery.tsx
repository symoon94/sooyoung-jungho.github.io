'use client';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export interface GalleryProps {
    selectedImage: number | null;
    setSelectedImage: (index: number | null) => void;
}

export default function Gallery({ selectedImage, setSelectedImage }: GalleryProps) {
    const images = [
        '/gallery/photo1.jpg',
        '/gallery/photo2.jpg',
        '/gallery/photo3.jpg',
    ];

    return (
        <>
            <div className="w-full relative">
                {/* Gallery 타이틀 */}
                <div className="text-center mb-8">
                    <div
                        className="inline-block border border-green-800 px-8 py-2 text-green-800"
                        style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}
                    >
                        gallery
                    </div>
                </div>

                {/* 이미지 그리드 */}
                <div className="relative grid grid-cols-3 gap-2">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="aspect-square relative cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(index)}
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 33vw, 200px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 선택된 이미지 모달 */}
            {selectedImage !== null && typeof window !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 bg-black/75 z-[999] flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-[80%] max-w-lg aspect-square p-4">
                        <Image
                            src={images[selectedImage]}
                            alt={`Gallery image ${selectedImage + 1}`}
                            fill
                            className="object-contain rounded-lg"
                            sizes="(max-width: 768px) 80vw, 500px"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
} 