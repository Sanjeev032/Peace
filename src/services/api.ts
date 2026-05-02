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

export const login = async (credentials: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (login):', error);
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (register):', error);
    throw error;
  }
};

export const adminLogin = async (password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (adminLogin):', error);
    throw error;
  }
};

// --- Music Library Management ---

export const createMusicTrack = async (trackData: any, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/music`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trackData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (createMusicTrack):', error);
    throw error;
  }
};

export const updateMusicTrack = async (id: string, trackData: any, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trackData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (updateMusicTrack):', error);
    throw error;
  }
};

export const deleteMusicTrack = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (deleteMusicTrack):', error);
    throw error;
  }
};

// --- Mood Configuration Management ---

export const createMoodConfig = async (configData: any, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood-configs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(configData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (createMoodConfig):', error);
    throw error;
  }
};

export const updateMoodConfig = async (id: string, configData: any, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood-configs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(configData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (updateMoodConfig):', error);
    throw error;
  }
};

export const deleteMoodConfig = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mood-configs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (deleteMoodConfig):', error);
    throw error;
  }
};

// --- Quiz Management ---

export const fetchQuiz = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz`);
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (fetchQuiz):', error);
    throw error;
  }
};

export const createQuizQuestion = async (questionData: any, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (createQuizQuestion):', error);
    throw error;
  }
};

export const updateQuizQuestion = async (id: string, questionData: any, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (updateQuizQuestion):', error);
    throw error;
  }
};

export const deleteQuizQuestion = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error: any) {
    console.error('API Error (deleteQuizQuestion):', error);
    throw error;
  }
};


