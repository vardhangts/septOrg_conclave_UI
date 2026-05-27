export type GoogleSheetRegistrationPayload = {
  name: string;
  email?: string;
  phone?: string;
  city: string;
  occupation: string;
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to submit registration.');
  }

  return response.json();
};
