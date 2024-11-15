export async function POST({ request }) {
  const { token } = await request.json();

  console.log('Attempting logout with token:', token);

  try {
    const redirectUri = 'https://bd9c-109-95-143-25.ngrok-free.app/';
    const logoutUrl = `https://shopify.com/authentication/90610270557/logout?id_token_hint=${token}&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;

    const response = await fetch(logoutUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    // Get response text first
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    // Check if the response is a redirect (302) or success (200)
    if (response.ok || response.status === 302) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // If not successful, return error
    return new Response(
      JSON.stringify({
        error: `Logout failed with status ${response.status}`,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Logout failed:', error);
    return new Response(
      JSON.stringify({
        error: 'Logout failed: ' + error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
