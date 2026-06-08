export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [2],
        updateEnabled: true
      })
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Failed to subscribe' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}