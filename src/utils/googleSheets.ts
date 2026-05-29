export type GoogleSheetRegistrationPayload = {
  name: string;
  age: string;
  email?: string;
  phone?: string;
  city?: string;
  occupation?: string;
  timestamp: string;
};

export const submitRegistrationToGoogleSheet = async (
  endpointUrl: string,
  payload: GoogleSheetRegistrationPayload,
) => {
  if (!endpointUrl) {
    throw new Error('Google Sheets endpoint is not configured.');
  }

  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to submit registration.');
  }

  return response.json();
};
