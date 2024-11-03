
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* 헤더 섹션 */}
      <div className="w-full max-w-lg px-4 pt-16 text-center">
        <p className="text-gray-600 mb-2">2025년 2월 16일 일요일 오후 2시</p>
        <h1 className="text-2xl font-bold mb-1">수영 ♥ 정호</h1>
        <p className="text-xl text-gray-800">결혼합니다</p>
      </div>

      {/* 메인 이미지 */}
      <div className="w-full max-w-lg my-8">
        <div className="relative w-full h-[400px]">
          {/* <img
            src="/images/main-photo.jpg"
            alt="웨딩 사진"
            className="w-full h-full object-cover"
          /> */}
        </div>
      </div>

      {/* 메시지 박스 */}
      <div className="w-full max-w-lg px-4 text-center mb-8">
        <p className="text-gray-700 leading-relaxed">
          서로 사랑하며 아끼는 마음으로<br />
          평생을 함께하고자 합니다.<br />
          귀한 걸음 하시어 축복해 주시면<br />
          감사하겠습니다.
        </p>
      </div>

      {/* 버튼 그룹 */}
      <div className="w-full max-w-lg px-4 flex justify-around mb-8">
        <button className="w-[40%] py-4 bg-gray-100 rounded-lg text-gray-700">
          오시는 길
        </button>
        <button className="w-[40%] py-4 bg-gray-100 rounded-lg text-gray-700">
          갤러리
        </button>
      </div>
    </main>
  );
}
