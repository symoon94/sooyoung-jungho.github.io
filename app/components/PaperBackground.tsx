'use client';

export default function PaperBackground() {
    return (
        <div
            className="fixed inset-0 w-full h-full -z-10"
            style={{
                backgroundColor: '#fff',
                backgroundImage: `
                    repeating-radial-gradient(
                        circle at 0 0,
                        transparent 0,
                        rgba(0,0,0,0.02) 1px,
                        transparent 2px
                    ),
                    repeating-linear-gradient(
                        45deg,
                        rgba(0,0,0,0.01) 0,
                        rgba(0,0,0,0.01) 1px,
                        transparent 1px,
                        transparent 2px
                    )
                `,
                backgroundSize: '20px 20px',
                filter: 'contrast(98%) brightness(98%)'
            }}
        />
    );
} 