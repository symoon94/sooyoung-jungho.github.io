export default function KakaoPayButton({ href }: { href: string }) {
    return (
        <a
            href={href}
            className="inline-flex items-center h-[26px]"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                verticalAlign: 'middle',
                display: 'inline-flex',
                alignItems: 'center'
            }}
        >
            <img
                src="/kpbtn.svg"
                alt="카카오페이 송금"
                className="h-full w-auto"
                style={{ verticalAlign: 'middle' }}
            />
        </a>
    );
} 