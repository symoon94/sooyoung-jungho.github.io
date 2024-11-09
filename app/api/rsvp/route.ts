import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // cztheday25@gmail.com
    pass: process.env.EMAIL_PASS  // Gmail 앱 비밀번호
  }
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.text();
    const { name, attendance, numberOfGuests, message, side } = JSON.parse(data);

    // GitHub에 저장
    const timestamp = new Date().toISOString();
    const content = {
      name,
      side,
      attendance,
      numberOfGuests,
      message,
      submittedAt: timestamp
    };

    // GitHub API 호출
    await fetch(`https://api.github.com/repos/sooyoung-jungho/sooyoung-jungho.github.io/contents/rsvp/${timestamp}.json`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `RSVP submission from ${name}`,
        content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
        branch: 'main'
      })
    });

    // 이메일 발송
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'cztheday25@gmail.com',
      subject: `[청첩장 RSVP] ${name}님의 참석 여부`,
      html: `
        <h2>새로운 RSVP 응답이 도착했습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>구분:</strong> ${side}측 하객</p>
        <p><strong>참석 여부:</strong> ${attendance}</p>
        <p><strong>참석인원:</strong> ${numberOfGuests}명</p>
        <p><strong>메시지:</strong> ${message || '(없음)'}</p>
        <p><strong>제출 시간:</strong> ${new Date(timestamp).toLocaleString('ko-KR')}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { error: '제출 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 