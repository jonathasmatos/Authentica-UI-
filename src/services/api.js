import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (err.response?.status === 403) {
      // Redireciona para o dashboard ou exibe erro de permissão
      console.error('Acesso proibido: você não tem permissão para esta ação.');
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/authenticate', { email, password }),
  register: (email, password) => api.post('/auth/register', { email, password }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
};

export const adminAPI = {
  // --- USERS ---
  getUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // --- ROLES ---
  getRoles: () => api.get('/admin/roles'),
  createRole: (name) => api.post('/admin/roles', name, { headers: { 'Content-Type': 'text/plain' } }),
  updateRole: (id, name) => api.put(`/admin/roles/${id}`, name, { headers: { 'Content-Type': 'text/plain' } }),
  deleteRole: (id) => api.delete(`/admin/roles/${id}`),

  // --- PERMISSIONS ---
  getPermissions: () => api.get('/admin/permissions'),
  createPermission: (name) => api.post('/admin/permissions', name, { headers: { 'Content-Type': 'text/plain' } }),
  updatePermission: (id, name) => api.put(`/admin/permissions/${id}`, name, { headers: { 'Content-Type': 'text/plain' } }),
  deletePermission: (id) => api.delete(`/admin/permissions/${id}`),

  // --- ASSIGNMENTS ---
  assignRole: (userId, roleName) => api.post(`/admin/users/${userId}/roles/${roleName}`),
  removeRole: (userId, roleName) => api.delete(`/admin/users/${userId}/roles/${roleName}`),
  addPermission: (roleName, permName) => api.post(`/admin/roles/${roleName}/permissions/${permName}`),
  removePermission: (roleName, permName) => api.delete(`/admin/roles/${roleName}/permissions/${permName}`)
};

export default api;
