
import GiscusComments from "./components/GiscusComments.client";
import RsvpDialog from './components/RsvpDialog';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white dark:bg-gray-900">
      <RsvpDialog />
      <div className="w-full max-w-md text-center my-8">
        <h1 className="text-3xl font-serif mb-2 text-gray-800 dark:text-gray-100">
          수영 ♥️ 정호
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          우리, 결혼합니다
        </p>
      </div>

      {/* 날짜 및 장소 섹션 */}
      <div className="w-full max-w-md text-center my-8 space-y-4">
        <div className="text-xl font-medium text-gray-800 dark:text-gray-100">
          2025년 2월 16일 일요일 오후 2시
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          노블발렌티 대치
        </div>
      </div>

      {/* 인사말 섹션 */}
      <div className="w-full max-w-md text-center my-8 space-y-4 px-4">
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          서로 마주보며 다져온 사랑을 이제 함께 한 곳을 바라보며
          걸어가고자 합니다. 저희의 새로운 시작을
          축복해 주시면 감사하겠습니다.
        </p>
      </div>

      {/* 혼주 정보 */}
      <div className="w-full max-w-md text-center my-8 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
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

      {/* 방명록 (기존 GiscusComments 유지) */}
      <div className="w-full max-w-md my-8">
        <h2 className="text-xl font-medium text-center mb-4 text-gray-800 dark:text-gray-100">
          축하의 말씀을 남겨주세요
        </h2>
        <GiscusComments />
      </div>
    </main>
  );
}
