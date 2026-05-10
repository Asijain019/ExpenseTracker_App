const BASE = "/api";

export const getToken = () => localStorage.getItem("et_token");
export const getStoredUser = () => { 
  try { 
    return JSON.parse(localStorage.getItem("et_user") || "null"); 
  } catch { 
    return null; 
  } 
};
export const storeAuth = (token: string, user: object) => { 
  localStorage.setItem("et_token", token); 
  localStorage.setItem("et_user", JSON.stringify(user)); 
};
export const clearAuth = () => { 
  localStorage.removeItem("et_token"); 
  localStorage.removeItem("et_user"); 
};

const headers = (extra = {}) => ({ 
  "Content-Type": "application/json", 
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}), 
  ...extra 
});

export const api = {
  register: (data: object) => fetch(`${BASE}/auth/register`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  login: (data: object) => fetch(`${BASE}/auth/login`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  me: () => fetch(`${BASE}/auth/me`, { headers: headers() }).then(r => r.json()),
  updateProfile: (data: object) => fetch(`${BASE}/auth/profile`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  getExpenses: () => fetch(`${BASE}/expenses`, { headers: headers() }).then(r => r.json()),
  addExpense: (data: object) => fetch(`${BASE}/expenses`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),
  deleteExpense: (id: string) => fetch(`${BASE}/expenses/${id}`, { method: "DELETE", headers: headers() }),
};