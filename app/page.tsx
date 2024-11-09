'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AccountInfo from './components/AccountInfo';
import ContactCard from './components/ContactCard';
import Gallery from './components/Gallery';
import LocationInfo from './components/LocationInfo';
import Map from './components/Map';
import PhoneIcon from './components/PhoneIcon';
import RsvpModal from './components/RsvpModal';
import Snowfall from './components/Snowfall';

export default function Home() {
  const [titleRef, isTitleVisible] = useIntersectionObserver();
  const [dateRef, isDateVisible] = useIntersectionObserver();
  const [messageRef, isMessageVisible] = useIntersectionObserver();
  const [parentsRef, isParentsVisible] = useIntersectionObserver();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(2025, 1, 16).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      setTimeLeft({
        days: Math.ceil(difference / (1000 * 60 * 60 * 24)),
        hours: String(new Date().getHours()).padStart(2, '0'),
        minutes: String(new Date().getMinutes()).padStart(2, '0'),
        seconds: String(new Date().getSeconds()).padStart(2, '0')
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      className="relative h-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory"
      style={{
        backgroundImage: 'url(/paper.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <Snowfall />

      {/* 첫 번째 섹션 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-4xl mx-auto text-center transition-opacity duration-1000 ${isTitleVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* 상단 날짜 */}
          <div className="inline-block border border-green-800 px-4 sm:px-6 py-1 mb-4 sm:mb-8 text-green-800 text-sm sm:text-base"
            style={{ borderRadius: '50%' }}>
            2025 02 16
          </div>

          {/* The Marriage of */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-green-800 relative z-10 mb-4 sm:mb-8 italic">
            The Marriage of
          </h1>

          {/* 메인 사진들 */}
          <div className="flex flex-row justify-center gap-3 sm:gap-4 lg:gap-6 my-4 sm:my-6 lg:my-8">
            <div className="w-[30vw] max-w-[144px] h-[40vw] max-h-[192px] relative">
              <Image
                src="/gallery/sooyoung.png"
                alt="Sooyoung Photo"
                className="object-cover rounded-lg shadow-lg"
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1024px) 144px, 192px"
              />
            </div>
            <div className="w-[30vw] max-w-[144px] h-[40vw] max-h-[192px] relative">
              <Image
                src="/gallery/jungho.png"
                alt="Jungho Photo"
                className="object-cover rounded-lg shadow-lg"
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1024px) 144px, 192px"
              />
            </div>
          </div>

          {/* 이름 */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-green-800 mb-4 sm:mb-6 lg:mb-8 relative z-10">
            Sooyoung & Jungho
          </h2>

          {/* 날짜와 장소 */}
          <p className="text-sm sm:text-base lg:text-lg text-green-800 mb-2 font-serif">
            2025 2 16 SUN 2PM
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-green-800 font-serif">
            노블발렌티 대치
          </p>

          {/* Invitation 원형 */}
          <div className="mt-6 sm:mt-8 lg:mt-12">
            <div className="inline-block border border-green-800 px-4 sm:px-6 py-1 text-green-800 text-sm sm:text-base italic"
              style={{ borderRadius: '50%' }}>
              invitation
            </div>
          </div>
        </div>
      </section>

      {/* 두 번째 페이지: 메시지 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <div
          ref={messageRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-md text-center transition-opacity duration-1000 ${isMessageVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Wedding Day */}
          <div className="text-center text-green-800 my-4">
            <div className="text-center text-green-800 my-4">
              <div className="relative">
                <div className="relative flex justify-center">
                  {'wedding day'.split('').map((letter, index, array) => {
                    const mid = Math.floor(array.length / 2);
                    const distanceFromMid = index - mid;
                    const rotation = (distanceFromMid * 3.5);
                    const verticalOffset = Math.pow(Math.abs(distanceFromMid), 1.5) * 1;

                    return (
                      <span
                        key={index}
                        className="inline-block font-serif font-bold italic text-sm tracking-[0.15em] relative"
                        style={{
                          transform: `rotate(${rotation}deg) translateY(${verticalOffset}px)`,
                          transformOrigin: 'bottom center',
                          color: '#1a472a',
                          textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.1)'
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
                <div className="font-serif text-sm tracking-wider">02</div>
                <div className="font-serif text-sm tracking-wider">16</div>
              </div>
            </div>
          </div>

          {/* 메인 텍스트 */}
          <div className="space-y-2 text-center text-gray-600 mt-16 korean-font">
            <p>같이 있을 때</p>
            <p>가장 나다운 모습이 되게 하는</p>
            <p>사람을 만났습니다.</p>

            <p>설레는 시작의 순간,</p>
            <p>저희의 행복한 출발에 함께 하셔서</p>
            <p>자리를 빛내 주시면 감사하겠습니다.</p>
          </div>

          {/* 구분선 */}
          <div className="text-green-800 tracking-widest mt-16">
            . . . . . .
          </div>

          {/* 혼주 정보 */}
          <div className="text-center space-y-2 text-gray-700 mt-16 korean-font">
            <p>현종권 · 안미향 의 아들 정 호</p>
            <p>문영환 · 이동신 의 딸 수 영</p>
          </div>

          {/* 날짜 및 장소 */}
          <div className="relative">
            {/* 뒤쪽 장식용 테두리 */}
            <div className="absolute -right-2 -top-2 border border-green-800/30 w-full h-full transform rotate-2" />
            <div className="absolute -left-2 -bottom-2 border border-green-800/20 w-full h-full transform -rotate-1" />

            {/* 메인 컨텐츠 테두리 */}
            <div className="border border-green-800 py-4 px-1 text-center text-gray-600 mt-16 backdrop-blur-sm relative korean-font">
              <p>2025년 2월 16일 일요일 오후 2시</p>
              <p>노블발렌티 대치</p>
            </div>
          </div>
        </div>
      </section>




      {/* 갤러리 섹션 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <Gallery />
      </section>

      {/* 캘린더 섹션 (3번째 페이지) */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <div
          ref={dateRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-md text-center transition-opacity duration-1000 ${isDateVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* February 타이틀과 타원을 별개의 div로 구현 */}
          <div className="text-center mb-12 relative h-[35px]">
            {/* 타원 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-[115px] h-[35px] border border-green-800 transform -rotate-6"
                style={{ borderRadius: '50%' }}
              />
            </div>

            {/* February 텍스트 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span
                className="text-4xl text-green-800 italic"
                style={{ fontFamily: 'Bodoni Std' }}
              >
                February
              </span>
            </div>
          </div>

          {/* 달력 내용 */}
          <div className="grid grid-cols-7 gap-4">
            {/* 요일 표시 */}
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="text-green-800 text-sm mb-2">
                {day}
              </div>
            ))}

            {/* 빈 칸 추가 (1일이 토요일이므로 앞에 6칸의 빈 공간 필요) */}
            {[...Array(6)].map((_, index) => (
              <div key={`empty-${index}`} className="text-lg text-transparent">
                -
              </div>
            ))}

            {/* 날짜 */}
            {[...Array(29)].map((_, index) => {
              const day = index + 1;
              return (
                <div key={index} className={`text-lg 
                  ${day === 16 ? 'text-white' : 'text-gray-500'}
                  ${day === 16 ? 'relative' : ''}
                `}>
                  {day === 16 ? (
                    <div className="relative">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-[1.4rem] text-green-800">
                        ♥
                      </div>
                      <div className="bg-green-800 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                        16
                      </div>
                    </div>
                  ) : day}
                </div>
              );
            })}
          </div>

          {/* D-day 카운트 */}
          <div className="mt-12 mb-8">
            {/* 타이머 컨테이너 */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Days */}
              <div className="bg-gray-50 rounded-lg p-3 w-24 text-center">
                <div className="text-sm text-gray-600 font-serif mb-1">DAYS</div>
                <div className="text-3xl text-green-800 font-serif">
                  {timeLeft.days}
                </div>
              </div>

              <div className="text-2xl text-green-800 font-serif">:</div>

              {/* Hours */}
              <div className="bg-gray-50 rounded-lg p-3 w-24 text-center">
                <div className="text-sm text-gray-600 font-serif mb-1">HOUR</div>
                <div className="text-3xl text-green-800 font-serif">
                  {timeLeft.hours}
                </div>
              </div>

              <div className="text-2xl text-green-800 font-serif">:</div>

              {/* Minutes */}
              <div className="bg-gray-50 rounded-lg p-3 w-24 text-center">
                <div className="text-sm text-gray-600 font-serif mb-1">MIN</div>
                <div className="text-3xl text-green-800 font-serif">
                  {timeLeft.minutes}
                </div>
              </div>

              <div className="text-2xl text-green-800 font-serif">:</div>

              {/* Seconds */}
              <div className="bg-gray-50 rounded-lg p-3 w-24 text-center">
                <div className="text-sm text-gray-600 font-serif mb-1">SEC</div>
                <div className="text-3xl text-green-800 font-serif">
                  {timeLeft.seconds}
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-serif text-lg">
              정호 <span className="text-red-400">♥</span> 수영의 결혼식이 <span className="text-green-800">{timeLeft.days}일</span> 남았습니다.
            </p>
          </div>

          {/* 시간과 장소 */}
          <div className="mt-8 text-gray-600 font-serif">
            <p className="mb-2">2025년 2월 16일 일요일 오후 2시</p>
            <p>노블발렌티 대치</p>
          </div>
        </div>
      </section>

      {/* 오시는 길 섹션 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <div className="w-full max-w-md mx-auto">
          {/* Location 타이틀 */}
          <div className="text-center mb-8">
            <div className="inline-block border border-green-800 px-8 py-2 text-green-800 bodoni-font">
              location
            </div>
          </div>

          {/* 지도 */}
          <Map />

          {/* 주소 정보 */}
          <div className="text-center space-y-2 my-8">
            <h3 className="font-serif text-gray-600">노블발렌티 대치점</h3>
            <p className="font-serif text-gray-600">서울시 강남구 영동대로 325</p>
          </div>

          {/* 교통 정보 탭 */}
          <LocationInfo />
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <div className="w-full max-w-md">
          {/* 신랑신부 연락처 */}
          <div className="flex justify-between mb-12">
            <button
              onClick={() => window.location.href = 'tel:01012345678'}
              className="flex items-center gap-2 text-green-800"
            >
              <PhoneIcon />
              <span className="italic">Groom</span>
              <span className="font-serif">정호</span>
            </button>
            <button
              onClick={() => window.location.href = 'tel:01094735586'}
              className="flex items-center gap-2 text-green-800"
            >
              <PhoneIcon />
              <span className="italic">Bride</span>
              <span className="font-serif">수영</span>
            </button>
          </div>

          {/* 혼주 연락처 */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-green-800 mb-6">혼주연락처</h2>
            <div className="border border-green-800/30 p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ContactCard name="현종권" relation="신랑 아버지께 전화하기" phone="01012345678" isParent />
                  <ContactCard name="안미향" relation="신랑 어머니께 전화하기" phone="01012345678" isParent />
                </div>
                <div className="space-y-4">
                  <ContactCard name="문영환" relation="신부 아버지께 전화하기" phone="01012345678" isParent />
                  <ContactCard name="이동신" relation="신부 어머니께 전화하기" phone="01012345678" isParent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 마음 전하실 곳 섹션 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always korean-font">
        <div className="w-full max-w-md text-center">
          {/* 타이틀 */}
          <div className="text-center mb-8">
            <div className="inline-block border border-green-800 px-8 py-2 text-green-800 bodoni-font">
              account
            </div>
          </div>

          {/* 안내 메시지 */}
          <p className="text-gray-600 mb-8 italic">
            &ldquo;필요하신 분들을 위해<br />
            안내드리니 양해 부탁드립니다.<br />
            참석하지 못하시더라도 축복해주시는<br />
            그 마음 감사히 간직하겠습니다.&rdquo;
          </p>

          {/* 계좌 정보 */}
          <AccountInfo />
        </div>
      </section>

      {/* 참석여부 확인 섹션 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start snap-always">
        <div className="w-full max-w-md text-center space-y-8">
          {/* RSVP 타이틀 */}
          <div className="text-center mb-8">
            <div className="inline-block border border-green-800 px-8 py-2 text-green-800 bodoni-font">
              RSVP
            </div>
          </div>

          {/* 제목 */}
          <h2 className="text-2xl font-serif text-gray-800">참석여부</h2>

          {/* 안내 메시지 */}
          <div className="space-y-4 text-gray-600 korean-font">
            <p>참석에 부담 가지지 말아주시고,</p>
            <p>편하게 알려주세요.</p>
            <p>저희의 정성을 다하는 준비에 도움이 될 것 같아</p>
            <p>참석 여부를 알려주시면 감사하겠습니다.</p>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-200 w-1/2 mx-auto my-8" />

          {/* 날짜 정보 */}
          <div className="space-y-2">
            <p className="text-gray-800">
              정호 <span className="text-red-400 mx-2">♥</span> 수영
            </p>
            <p className="text-2xl font-serif text-gray-800 my-4">
              02/16
            </p>
            <p className="text-gray-600">일요일 오후 2시</p>
            <p className="text-gray-600">노블발렌티 대치</p>
          </div>

          {/* 참석여부 버튼 */}
          <button
            className="mt-8 bg-green-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            onClick={() => setIsRsvpOpen(true)}
          >
            참석여부 전달하기
          </button>
        </div>
      </section>

      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />
    </main>
  );
}
