'use client';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AccountInfo from './components/AccountInfo';
import Calendar from './components/Calendar';
import ContactCard from './components/ContactCard';
import LocationInfo from './components/LocationInfo';
import Map from './components/Map.client';
import Snowfall from './components/Snowfall';

export default function Home() {
  const [titleRef, isTitleVisible] = useIntersectionObserver();
  const [dateRef, isDateVisible] = useIntersectionObserver();
  const [messageRef, isMessageVisible] = useIntersectionObserver();
  const [parentsRef, isParentsVisible] = useIntersectionObserver();

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <Snowfall />
      {/* 첫 번째 섹션: 타이틀 */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-md text-center transition-opacity duration-1000 ${isTitleVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <h1 className="text-3xl font-serif mb-2 text-gray-800">
            수영 ♥️ 정호
          </h1>
          <p className="text-gray-700">
            우리, 결혼합니다
          </p>
        </div>
      </section>

      {/* 두 번째 섹션: 날짜 및 장소 */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <div
          ref={dateRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-md text-center space-y-4 transition-opacity duration-1000 ${isDateVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="text-xl font-medium text-gray-800">
            2025년 2월 16일 일요일 오후 2시
          </div>
          <div className="text-gray-600">
            노블발렌티 대치
          </div>
        </div>
      </section>

      {/* 세 번째 섹션: 인사말 */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <div
          ref={messageRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-md text-center space-y-4 px-4 transition-opacity duration-1000 ${isMessageVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <p className="text-gray-700 leading-relaxed">
            서로 마주보며 다져온 사랑을 이제 함께 한 곳을 바라보며
            걸어가고자 합니다. 저희의 새로운 시작을
            축복해 주시면 감사하겠습니다.
          </p>
        </div>
      </section>

      {/* 네 번째 섹션: 혼주 정보 */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <div
          ref={parentsRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-md text-center space-y-4 transition-opacity duration-1000 ${isParentsVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p>신랑측 혼주</p>
              <p>아버지 현종권</p>
              <p>어머니 안미향</p>
            </div>
            <div>
              <p>신부측 혼주</p>
              <p>아버지 문영환</p>
              <p>어머니 이동신</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar 섹션 (연락처 섹션 위에 추가) */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <Calendar weddingDate={new Date('2025-02-16')} />
      </section>

      {/* 연락처 섹션 */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <div className="w-full max-w-md space-y-6 px-4">
          <h2 className="text-xl font-medium text-center mb-8 text-gray-800">
            연락하기
          </h2>
          <div className="space-y-4">
            <ContactCard
              role="신랑"
              name="현정호"
              phone="01020371272"
            />
            <ContactCard
              role="신부"
              name="문수영"
              phone="01094735586"
            />
          </div>
        </div>
      </section>

      {/* 계좌번호 섹션 */}
      <section className="h-screen flex items-center justify-center snap-start bg-white">
        <AccountInfo />
      </section>

      {/* 지도 섹션 */}
      <section className="h-screen flex flex-col snap-start bg-white overflow-hidden">
        <div className="flex-1 pt-16">
          <div className="max-w-md mx-auto px-4">
            <Map />
            <div className="mt-8">
              <LocationInfo />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
