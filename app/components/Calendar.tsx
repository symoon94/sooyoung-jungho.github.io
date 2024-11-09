'use client';

interface CalendarProps {
  weddingDate: Date;
}

export default function Calendar({ weddingDate }: CalendarProps) {
  const today = new Date();
  const daysUntilWedding = Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // 달력 데이터 생성
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const date = weddingDate.getDate();
  
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  
  const days = Array.from({ length: lastDate }, (_, i) => i + 1);
  const weeks: (number | null)[][] = [];
  let week = Array(7).fill(null);

  // 첫 주 빈 날짜 채우기
  for (let i = 0; i < firstDay; i++) {
    week[i] = null;
  }

  // 날짜 채우기
  days.forEach((day, index) => {
    const weekDay = (firstDay + index) % 7;
    week[weekDay] = day;
    
    if (weekDay === 6 || day === lastDate) {
      weeks.push([...week]);
      week = Array(7).fill(null);
    }
  });

  return (
    <div className="w-full max-w-md mx-auto space-y-8 px-4">
      <div className="bg-slate-700 rounded-2xl p-8 text-white">
        {/* 월 표시 */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-light mb-8">{month + 1}월</h2>
          <div className="grid grid-cols-7 text-sm mb-4">
            <div className="text-red-300">일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div className="text-blue-300">토</div>
          </div>
        </div>

        {/* 달력 */}
        <div className="space-y-4">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 text-center">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`aspect-square flex items-center justify-center text-lg
                    ${day === date ? 'bg-amber-500 rounded-full' : ''}
                    ${dayIndex === 0 ? 'text-red-300' : ''}
                    ${dayIndex === 6 ? 'text-blue-300' : ''}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* D-Day */}
        <div className="mt-8 text-center border-t border-slate-600 pt-8">
          <div className="text-amber-500 text-lg mb-2">D-DAY</div>
          <div className="text-3xl font-light">{daysUntilWedding}</div>
        </div>
      </div>
    </div>
  );
} 