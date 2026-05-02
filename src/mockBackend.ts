// Mock Backend using window.fetch override and localStorage

const MOCK_DELAY = 500;

// Seed Data
const initialMoodConfigs = [
  { id: 'calm', label: 'Calm', emoji: '☁️', solidColor: '#8BA888', gradient: 'linear-gradient(135deg, #A3BCA0 0%, #8BA888 100%)', description: 'Serene and peaceful.' },
  { id: 'energetic', label: 'Energetic', emoji: '☀️', solidColor: '#E2B15B', gradient: 'linear-gradient(135deg, #F2C777 0%, #E2B15B 100%)', description: 'Bright and full of life.' },
  { id: 'reflective', label: 'Reflective', emoji: '🌙', solidColor: '#6B7A8F', gradient: 'linear-gradient(135deg, #8191A6 0%, #6B7A8F 100%)', description: 'Deep in thought.' },
  { id: 'anxious', label: 'Anxious', emoji: '🌧️', solidColor: '#A09D94', gradient: 'linear-gradient(135deg, #B5B2A9 0%, #A09D94 100%)', description: 'Feeling tense.' },
  { id: 'sad', label: 'Sad', emoji: '💧', solidColor: '#5B7C99', gradient: 'linear-gradient(135deg, #7293B0 0%, #5B7C99 100%)', description: 'Feeling down.' }
];

const initialQuiz = [
  {
    _id: 'q1',
    questionText: "How would you describe your current energy levels?",
    order: 1,
    options: [
      { text: "Very high - I feel like I need to move", moodImpact: "Energetic", scoreValue: 2 },
      { text: "Moderate - I'm feeling steady", moodImpact: "Calm", scoreValue: 1 },
      { text: "Low - I feel a bit drained", moodImpact: "Sad", scoreValue: 1 },
      { text: "Restless - I can't seem to settle", moodImpact: "Anxious", scoreValue: 2 }
    ]
  },
  {
    _id: 'q2',
    questionText: "How is your breathing right now?",
    order: 2,
    options: [
      { text: "Slow and deep", moodImpact: "Calm", scoreValue: 2 },
      { text: "Shallow or fast", moodImpact: "Anxious", scoreValue: 2 },
      { text: "Heavy or sighed", moodImpact: "Sad", scoreValue: 1 },
      { text: "Normal", moodImpact: "Reflective", scoreValue: 1 }
    ]
  },
  {
    _id: 'q3',
    questionText: "What is your mind mostly focused on?",
    order: 3,
    options: [
      { text: "The present moment", moodImpact: "Calm", scoreValue: 2 },
      { text: "Worries about the future", moodImpact: "Anxious", scoreValue: 2 },
      { text: "Memories of the past", moodImpact: "Reflective", scoreValue: 2 },
      { text: "I feel a bit foggy", moodImpact: "Sad", scoreValue: 1 }
    ]
  },
  {
    _id: 'q4',
    questionText: "If you could be anywhere right now, where would it be?",
    order: 4,
    options: [
      { text: "At a lively social gathering", moodImpact: "Energetic", scoreValue: 2 },
      { text: "Alone in a quiet forest", moodImpact: "Calm", scoreValue: 2 },
      { text: "In a cozy room with a book", moodImpact: "Reflective", scoreValue: 2 },
      { text: "Under a warm blanket", moodImpact: "Sad", scoreValue: 1 }
    ]
  },
  {
    _id: 'q5',
    questionText: "How do you feel about the rest of your day?",
    order: 5,
    options: [
      { text: "Excited and ready", moodImpact: "Energetic", scoreValue: 2 },
      { text: "Peaceful and accepting", moodImpact: "Calm", scoreValue: 2 },
      { text: "A bit overwhelmed", moodImpact: "Anxious", scoreValue: 2 },
      { text: "Indifferent or unmotivated", moodImpact: "Sad", scoreValue: 2 }
    ]
  }
];

const initialMusic = [
  { _id: 'm1', title: 'Forest Ambience', duration: '10:00', category: 'Nature', fileUrl: 'https://example.com/forest.mp3', moods: ['Calm', 'Reflective'] },
  { _id: 'm2', title: 'Upbeat Morning', duration: '3:00', category: 'Lo-Fi', fileUrl: 'https://example.com/lofi.mp3', moods: ['Energetic'] },
  { _id: 'm3', title: 'Deep Focus', duration: '60:00', category: 'Binaural', fileUrl: 'https://example.com/binaural.mp3', moods: ['Reflective', 'Calm'] }
];

// Initialize LocalStorage Database
const initDB = () => {
  if (!localStorage.getItem('mock_moodConfigs')) localStorage.setItem('mock_moodConfigs', JSON.stringify(initialMoodConfigs));
  if (!localStorage.getItem('mock_quiz')) localStorage.setItem('mock_quiz', JSON.stringify(initialQuiz));
  if (!localStorage.getItem('mock_music')) localStorage.setItem('mock_music', JSON.stringify(initialMusic));
  if (!localStorage.getItem('mock_moodHistory')) localStorage.setItem('mock_moodHistory', JSON.stringify([]));
  if (!localStorage.getItem('mock_users')) {
    localStorage.setItem('mock_users', JSON.stringify([
      { email: 'admin@peace.com', password: 'password', _id: 'u1', role: 'admin' },
      { email: 'user@peace.com', password: 'password', _id: 'u2', role: 'user' }
    ]));
  }
};

initDB();

const getDB = (key: string) => {
  try {
    const val = JSON.parse(localStorage.getItem(`mock_${key}`) || 'null');
    if (!val || !Array.isArray(val)) {
      // Re-initialize if missing, null, or not an array
      if (key === 'moodConfigs') return initialMoodConfigs;
      if (key === 'quiz') return initialQuiz;
      if (key === 'music') return initialMusic;
      if (key === 'users') return [
        { email: 'admin@peace.com', password: 'password', _id: 'u1', role: 'admin' },
        { email: 'user@peace.com', password: 'password', _id: 'u2', role: 'user' }
      ];
      return [];
    }
    return val;
  } catch (e) {
    return [];
  }
};
const setDB = (key: string, data: any) => localStorage.setItem(`mock_${key}`, JSON.stringify(data));

// Override fetch
const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let url = '';
  if (typeof input === 'string') url = input;
  else if (input instanceof URL) url = input.toString();
  else if (input instanceof Request) url = input.url;

  if (!url.includes('/api/')) {
    return originalFetch(input, init);
  }

  const method = init?.method || 'GET';
  const body = init?.body ? JSON.parse(init.body as string) : null;
  const path = url.split('/api/')[1];

  console.log(`[Mock Backend] ${method} /api/${path}`, body);

  const delay = () => new Promise(res => setTimeout(res, MOCK_DELAY));
  await delay();

  const createResponse = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const createError = (message: string, status = 400) => {
    return new Response(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  try {
    // ---- AUTH ----
    if (path === 'auth/login' && method === 'POST') {
      const users = getDB('users');
      const user = users.find((u: any) => u.email === body.email && u.password === body.password);
      
      if (user) {
        return createResponse({ 
          _id: user._id, 
          email: user.email, 
          token: 'mock-jwt-token-' + user._id,
          role: user.role || 'user'
        });
      }
      
      if (body.email === 'admin@peace.com' || body.email === 'admin') {
        return createResponse({ 
          _id: 'u1', 
          email: body.email, 
          token: 'mock-jwt-token',
          role: 'admin'
        });
      }
      return createError('Invalid credentials. (Hint: Register first or use any password for testing users)');
    }
    if (path === 'auth/admin-login' && method === 'POST') {
      if (body.password === 'admin123' || body.password === 'admin') {
        return createResponse({ 
          token: 'mock-admin-token', 
          message: 'Admin logged in',
          role: 'admin',
          email: 'admin@peace.com',
          _id: 'admin-id'
        });
      }
      return createError('Invalid admin password', 401);
    }
    if (path === 'auth/register' && method === 'POST') {
      const users = getDB('users');
      const newUser = { 
        ...body, 
        _id: 'u' + Date.now(), 
        role: body.role || 'user' 
      };
      setDB('users', [...users, newUser]);
      return createResponse({ 
        _id: newUser._id, 
        email: newUser.email, 
        token: 'mock-jwt-token-' + newUser._id,
        role: newUser.role
      });
    }

    // ---- MOOD CONFIGS ----
    if (path === 'mood-configs' && method === 'GET') return createResponse(getDB('moodConfigs'));
    if (path === 'mood-configs' && method === 'POST') {
      const data = getDB('moodConfigs');
      const newConfig = { ...body, id: body.id || Date.now().toString() };
      setDB('moodConfigs', [...data, newConfig]);
      return createResponse(newConfig, 201);
    }
    if (path.startsWith('mood-configs/') && method === 'PUT') {
      const id = path.split('/')[1];
      const data = getDB('moodConfigs');
      const updated = data.map((item: any) => item.id === id ? { ...item, ...body } : item);
      setDB('moodConfigs', updated);
      return createResponse(body);
    }
    if (path.startsWith('mood-configs/') && method === 'DELETE') {
      const id = path.split('/')[1];
      const data = getDB('moodConfigs');
      setDB('moodConfigs', data.filter((item: any) => item.id !== id));
      return createResponse({ message: 'Deleted' });
    }

    // ---- QUIZ ----
    if (path === 'quiz' && method === 'GET') return createResponse(getDB('quiz'));
    if (path === 'quiz' && method === 'POST') {
      const data = getDB('quiz');
      const newQ = { ...body, _id: 'q' + Date.now() };
      setDB('quiz', [...data, newQ]);
      return createResponse(newQ, 201);
    }
    if (path.startsWith('quiz/') && method === 'PUT') {
      const id = path.split('/')[1];
      const data = getDB('quiz');
      let updatedQ;
      const updated = data.map((item: any) => {
        if (item._id === id) {
          updatedQ = { ...item, ...body };
          return updatedQ;
        }
        return item;
      });
      setDB('quiz', updated);
      return createResponse(updatedQ);
    }
    if (path.startsWith('quiz/') && method === 'DELETE') {
      const id = path.split('/')[1];
      const data = getDB('quiz');
      setDB('quiz', data.filter((item: any) => item._id !== id));
      return createResponse({ message: 'Deleted' });
    }

    // ---- MUSIC ----
    if (path === 'music' && method === 'GET') return createResponse(getDB('music'));
    if (path.startsWith('music/') && method === 'GET') {
      const mood = path.split('/')[1];
      const data = getDB('music');
      const filtered = data.filter((item: any) => item.moods.includes(mood) || item.moods.includes(mood.charAt(0).toUpperCase() + mood.slice(1)));
      return createResponse(filtered);
    }
    if (path === 'music' && method === 'POST') {
      const data = getDB('music');
      const newM = { ...body, _id: 'm' + Date.now() };
      setDB('music', [...data, newM]);
      return createResponse(newM, 201);
    }
    if (path.startsWith('music/') && method === 'PUT') {
      const id = path.split('/')[1];
      const data = getDB('music');
      let updatedM;
      const updated = data.map((item: any) => {
        if (item._id === id) {
          updatedM = { ...item, ...body };
          return updatedM;
        }
        return item;
      });
      setDB('music', updated);
      return createResponse(updatedM);
    }
    if (path.startsWith('music/') && method === 'DELETE') {
      const id = path.split('/')[1];
      const data = getDB('music');
      setDB('music', data.filter((item: any) => item._id !== id));
      return createResponse({ message: 'Deleted' });
    }

    // ---- HISTORY & JOURNAL ----
    if (path === 'mood' && method === 'GET') return createResponse(getDB('moodHistory'));
    if (path === 'mood' && method === 'POST') {
      const data = getDB('moodHistory');
      const newEntry = { ...body, _id: 'h' + Date.now(), createdAt: new Date().toISOString() };
      setDB('moodHistory', [...data, newEntry]);
      return createResponse(newEntry, 201);
    }
    if (path === 'journal' && method === 'POST') {
      // Just mock success
      return createResponse({ message: 'Journal saved' }, 201);
    }

    console.warn(`[Mock Backend] Unhandled route: ${method} ${path}`);
    return createError('Route not found in mock backend', 404);

  } catch (err: any) {
    console.error('[Mock Backend] Error', err);
    return createError(err.message, 500);
  }
};

export {};
