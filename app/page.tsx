'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AccountInfo from './components/AccountInfo';
import ContactModal from './components/ContactModal';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import LocationInfo from './components/LocationInfo';
import Map from './components/Map';
import ShareButtons from './components/ShareButtons';
import Snowfall from './components/Snowfall';

const RsvpModal = dynamic(() => import('./components/RsvpModal'), {
  ssr: false
});

const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

// Add section flags at the top of the file
const SHOW_RSVP_SECTION = true;
const SHOW_ACCOUNT_SECTION = false;
const SHOW_GUESTBOOK_SECTION = true;

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

  const [mounted, setMounted] = useState(false);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [showBottomButtons, setShowBottomButtons] = useState(false);
  const [hideButtonsForToday, setHideButtonsForToday] = useState(false);

  const [galleryRef, isGalleryVisible] = useIntersectionObserver();
  const [calendarRef, isCalendarVisible] = useIntersectionObserver();
  const [rsvpRef, isRsvpVisible] = useIntersectionObserver();
  const [locationRef, isLocationVisible] = useIntersectionObserver();
  const [guestbookRef, isGuestbookVisible] = useIntersectionObserver();
  const [accountRef, isAccountVisible] = useIntersectionObserver();

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sectionRefs.current = Array.from(sections);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            setCurrentSection(index);
          }
        });
      },
      {
        threshold: 0.7, // 섹션이 70% 이상 보일 때 활성화
        root: document.querySelector('main')
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isScrolling]);

  const scrollToSection = useCallback((index: number) => {
    setIsScrolling(true);
    const section = sectionRefs.current[index];
    if (section) {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      }
    }
    // 스크롤 애니메이션이 끝난 후 isScrolling 상태 해제
    setTimeout(() => setIsScrolling(false), 1000);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    const currentSectionElement = sectionRefs.current[currentSection];
    if (!currentSectionElement) return;

    const { scrollHeight, clientHeight, scrollTop } = currentSectionElement;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;

    // 현재 섹션이 스크롤 가능하고 끝까지 스크롤되지 않았다면 기본 스크롤 동작 허용
    if (scrollHeight > clientHeight) {
      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        return;
      }
    }

    // 섹션 전환이 필요한 경우에만 기본 동작 방지
    e.preventDefault();
    if (isScrolling) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = currentSection + direction;

    if (nextSection >= 0 && nextSection < sectionRefs.current.length) {
      scrollToSection(nextSection);
    }
  }, [currentSection, isScrolling, scrollToSection]);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => mainElement.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  // Touch events for mobile
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const currentSectionElement = sectionRefs.current[currentSection];
    if (!currentSectionElement) return;

    const { scrollHeight, clientHeight, scrollTop } = currentSectionElement;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;

    // 현재 섹션이 스크롤 가능하고 끝까지 스크롤되지 않았다면 기본 스크롤 동작 허용
    if (scrollHeight > clientHeight) {
      if ((e.touches[0].clientY > touchStartY.current && !isAtBottom) || (e.touches[0].clientY < touchStartY.current && !isAtTop)) {
        return;
      }
    }

    // 섹션 전환이 필요한 경우에만 기본 동작 방지
    e.preventDefault();
    if (isScrolling) return;

    const direction = e.touches[0].clientY > touchStartY.current ? 1 : -1;
    const nextSection = currentSection + direction;

    if (nextSection >= 0 && nextSection < sectionRefs.current.length) {
      scrollToSection(nextSection);
    }
  }, [currentSection, isScrolling, scrollToSection]);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('touchstart', handleTouchStart);
      mainElement.addEventListener('touchmove', handleTouchMove);
      return () => {
        mainElement.removeEventListener('touchstart', handleTouchStart);
        mainElement.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [handleTouchStart, handleTouchMove]);

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    const lastSection = document.querySelector('section:last-of-type');

    if (!lastSection || hideButtonsForToday) return;

    const lastSectionPosition = lastSection.getBoundingClientRect();
    if (lastSectionPosition.bottom <= window.innerHeight + 100) {
      setIsRsvpOpen(true);
      setShowBottomButtons(true);
    } else {
      setShowBottomButtons(false);
    }
  }, [hideButtonsForToday]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const weddingDate = new Date(2025, 1, 16, 14, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    const hideUntil = localStorage.getItem('hideBottomButtonsUntil');
    if (hideUntil) {
      const hideUntilDate = new Date(hideUntil);
      if (hideUntilDate > new Date()) {
        setHideButtonsForToday(true);
      } else {
        localStorage.removeItem('hideBottomButtonsUntil');
      }
    }
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const hideForToday = () => {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    localStorage.setItem('hideBottomButtonsUntil', tomorrow.toISOString());
    setHideButtonsForToday(true);
    setShowBottomButtons(false);
  };

  useEffect(() => {
    // RSVP 제출 여부 확인
    const hasSubmittedRsvp = localStorage.getItem('rsvpSubmitted') === 'true';
    if (hasSubmittedRsvp) {
      setHideButtonsForToday(true);
    }
  }, []);

  if (!mounted) {
    return (
      <main className="h-screen flex items-center justify-center">
        <div className="text-green-800"></div>
      </main>
    );
  }

  return (
    <>
      <main
        className="relative h-screen overflow-x-hidden overflow-y-auto"
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
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 snap-start">
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            className={`w-full max-w-4xl mx-auto text-center transition-opacity duration-1000 ${isTitleVisible ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* 상단 날짜 */}
            <div className="inline-block border border-green-800 sm:px-4 px-3 py-2 mb-4 sm:mb-8 text-green-800 text-sm sm:text-base font-serif"
              style={{ borderRadius: '50%' }}>
              <span className="font-bold">2025 </span>
              <span className="font-bold">02 </span>
              <span className="font-bold">16</span>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-green-800 mb-4 sm:mb-6 lg:mb-8 relative z-10">
              Sooyoung & Jungho
            </h2>

            {/* 날짜와 장소 */}
            <p className="text-sm sm:text-base lg:text-lg text-green-800 mb-2 font-serif italic">
              2025 2 16 SUN 2PM
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-green-800 korean-text italic">
              노블발렌티 대치
            </p>

            {/* Invitation 원형 */}
            <div className="mt-4 sm:mt-6 lg:mt-8">
              <div className="inline-block border border-green-800 sm:px-4 px-3 py-2 text-green-800 text-sm sm:text-base font-serif"
                style={{ borderRadius: '50%' }}>
                invitation
              </div>
            </div>
          </div>
        </section>

        {/* 두 번째 페이지: 메시지 */}
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 snap-start">
          <div
            ref={messageRef as React.RefObject<HTMLDivElement>}
            className={`w-full max-w-md text-center transition-opacity duration-1000 ${isMessageVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Wedding Day */}
            <div className="text-center text-green-800 my-4">
              <div className="relative flex justify-center">
                {'wedding day'.split('').map((letter, index, array) => {
                  const mid = Math.floor(array.length / 2);
                  const distanceFromMid = index - mid;

                  // 회전 각도 조정
                  const rotation = distanceFromMid * 5; // 각도를 약간 증가시켜 곡선을 더 부드럽게

                  // 수직 오프셋 조정
                  const verticalOffset = Math.pow(Math.abs(distanceFromMid), 1.5) * 1.2; // 음수로 설정하여 위로 올리기

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
              <div className="mt-1 font-serif text-sm tracking-wider">02</div>
              <div className="font-serif text-sm tracking-wider">16</div>
            </div>

            {/* 메인 텍스트 */}
            <div className="space-y-2 text-center text-gray-600 mt-16 korean-text">
              <p>같이 있을 때</p>
              <p>가장 나다운 모습이 되게 하는</p>
              <p>사람을 만났습니다.</p>
              <br />
              <p>귀하신 발걸음이</p>
              <p>저희의 행복한 출발을</p>
              <p>더욱 빛나게 해주길 바랍니다.</p>
            </div>

            {/* 구분선 */}
            <div className="text-green-800 tracking-widest mt-16">
              . . . . . .
            </div>

            {/* 혼주 정보 */}
            <div className="text-center space-y-2 text-gray-700 mt-16 korean-text">
              <div className="flex justify-between max-w-[220px] mx-auto">
                <span>현종권 · 안미향 의 아들</span>
                <span className="w-[60px]">정호</span>
              </div>
              <div className="flex justify-between max-w-[220px] mx-auto">
                <span>문영환 · 이동신 의 딸</span>
                <span className="w-[60px]">수영</span>
              </div>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="mt-4 px-3 py-1.5 bg-green-800 text-white text-xs rounded-full shadow-lg hover:bg-green-700 transition-colors korean-text"
            >
              연락하기
            </button>

            {/* 날짜 및 장소 */}
            <div className="relative w-80 mx-auto">
              {/* 뒤쪽 장식용 테두리 */}
              <div className="absolute -left-2 -bottom-2 border border-green-800/20 w-full h-full transform -rotate-1" />

              {/* 메인 컨텐츠 테두리 */}
              <div className="border border-green-800 py-4 px-1 text-center text-gray-600 mt-14 backdrop-blur-sm relative korean-text">
                <p>2025년 2월 16일 일요일 오후 2시</p>
                <p>노블발렌티 대치</p>
              </div>
            </div>
          </div>
        </section>




        {/* 갤러리 섹션 */}
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 snap-start">
          <div
            ref={galleryRef as React.RefObject<HTMLDivElement>}
            className={`w-full max-w-md px-4 sm:px-0 transition-all duration-1000 transform relative
              ${isGalleryVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          >
            <Gallery
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        </section>

        {/* 캘린더 섹션 (3번째 페이지) */}
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 snap-start">
          <div
            ref={calendarRef as React.RefObject<HTMLDivElement>}
            className={`w-full max-w-md px-4 sm:px-0 transition-all duration-1000 transform 
              ${isCalendarVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          >
            <div
              ref={dateRef as React.RefObject<HTMLDivElement>}
              className={`w-full max-w-md text-center transition-opacity duration-1000 ${isDateVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* February 타이틀과 타을 별개의 div로 구현 */}
              <div className="text-center mb-12 relative h-[35px]">
                {/* 타원 */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-[160px] h-[40px] border border-green-800 transform -rotate-6"
                    style={{ borderRadius: '50%' }}
                  />
                </div>

                {/* February 텍스트 */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="text-4xl text-green-800 italic"
                    style={{ fontFamily: 'MadeKenfolg' }}
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

                <p className="text-gray-600 korean-text text-lg">
                  정호 <span className="text-red-400">♥</span> 수영의 결혼식이 <span className="text-green-800">{timeLeft.days}일</span> 남았습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP 섹션 */}
        {SHOW_RSVP_SECTION && (
          <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 snap-start">
            <div
              ref={rsvpRef as React.RefObject<HTMLDivElement>}
              className={`w-full max-w-md px-4 sm:px-0 text-center space-y-8 korean-text transition-all duration-1000 transform 
                ${isRsvpVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            >
              {/* RSVP 이틀 */}
              <div className="text-center mb-8">
                <div className="inline-block border border-green-800 px-8 py-2 text-green-800" style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}>
                  R.S.V.P
                </div>
              </div>

              {/* 제목 */}
              <h2 className="text-2xl text-gray-800">참석여부</h2>

              {/* 안내 메시지 */}
              <div className="space-y-4 text-gray-600">
                <p>부족함없이 식사를 제공할 수 있기 위함이니</p>
                <p>참석에 부담 가지지 말아주시고,</p>
                <p>편하게 알려주시면 감사합니다.</p>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-200 w-1/2 mx-auto my-8" />

              {/* 참석여부 버튼 */}
              <button
                className="mt-8 bg-green-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
                onClick={() => setIsRsvpOpen(true)}
              >
                참석여부 전달하기
              </button>
            </div>
          </section>
        )}

        {/* 오시는 길 섹션 */}
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 korean-text snap-start">
          <div className="w-full max-w-md mx-auto">
            {/* Location 타이틀 */}
            <div className="text-center mb-8">
              <div className="inline-block border border-green-800 px-8 py-2 text-green-800" style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}>
                location
              </div>
            </div>

            {/* 지도 */}
            <Map />

            <div className="mt-8" />

            {/* 교통 정보 탭 */}
            <LocationInfo />
          </div>
        </section>

        {/* 연락처 모달 컴포넌트 */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />


        {/* 방명록 섹션 */}
        {SHOW_GUESTBOOK_SECTION && (
          <section id="guestbook-section" className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 snap-start">
            <Guestbook />
          </section>
        )}

        {/* 마음 전하실 곳 섹션 */}
        {SHOW_ACCOUNT_SECTION && (
          <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-8 sm:p-4 korean-text snap-start">
            <div className="w-full max-w-md px-4 sm:px-0 text-center">
              {/* 안내 메시지 */}
              <h2 className="text-xl font-medium text-center mb-8 text-gray-800">
                마음 전해주실 곳
              </h2>
              <div className="text-gray-600 mb-8 italic text-balance space-y-4">
                <p>&ldquo;필요하신 분들을 위해</p>
                <p>안내드리니 양해 부탁드립니다.</p>
                <p>참석하지 못하시더라도 축하해주시는</p>
                <p>그 마음 감사히 간직하겠습니다.&rdquo;</p>
              </div>


              {/* 계좌 정보 */}
              <AccountInfo />
            </div>
          </section>
        )}

        {/* 공유하기 섹션 추가 */}
        <section className="relative z-10 w-full flex flex-col items-center justify-center p-8 sm:p-4 mb-16 snap-start">
          <ShareButtons />
        </section>
      </main>

      {/* RSVP Modal - Only include if RSVP section is enabled */}
      {SHOW_RSVP_SECTION && (
        <RsvpModal
          isOpen={isRsvpOpen}
          onClose={() => setIsRsvpOpen(false)}
          showHideForToday={showBottomButtons}
          onHideForToday={hideForToday}
        />
      )}

      <Toaster position="bottom-center" />
    </>
  );
}
