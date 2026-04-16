const API_BASE_URL = '/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const fetchMoodConfigs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood-configs`);
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (fetchMoodConfigs):', error);
    throw error;
  }
};

export const fetchMusicByMood = async (mood: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/${mood}`);
    return await handleResponse(response);
  } catch (error: any) {
    console.error(`API Error (fetchMusicByMood for ${mood}):`, error);
    throw error;
  }
};

export const fetchAllMusic = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/music`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (fetchAllMusic):', error);
    throw error;
  }
};

export const fetchMoodHistory = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (fetchMoodHistory):', error);
    throw error;
  }
};

export const createJournal = async (content: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, title: `Entry ${new Date().toLocaleDateString()}` }),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (createJournal):', error);
    throw error;
  }
};

export const createMoodEntry = async (mood: string, score: number, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mood, score }),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (createMoodEntry):', error);
    throw error;
  }
};

