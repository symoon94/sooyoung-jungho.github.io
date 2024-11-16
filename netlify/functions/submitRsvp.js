const fetch = require('node-fetch');

exports.handler = async (event) => {
  console.log('Starting RSVP submission...');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, side, attendance, numberOfGuests, message } = JSON.parse(event.body);
    const timestamp = new Date().toISOString();
    
    console.log('Parsed request data:', { name, side, attendance, numberOfGuests });
    console.log('GitHub Token exists:', !!process.env.GITHUB_TOKEN);

    const content = {
      name,
      side,
      attendance,
      numberOfGuests,
      message,
      submittedAt: timestamp
    };

    const response = await fetch(
      `https://api.github.com/repos/sooyoung-jungho/sooyoung-jungho.github.io/contents/rsvp/${timestamp}.json`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Wedding-RSVP-App'  // GitHub API requires User-Agent
        },
        body: JSON.stringify({
          message: `RSVP submission from ${name}`,
          content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
          branch: 'main'
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API Error:', errorData);
      throw new Error(`Failed to submit RSVP: ${response.status} ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'RSVP submitted successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Failed to submit RSVP' })
    };
  }
}; 