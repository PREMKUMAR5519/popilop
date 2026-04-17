import http from './http';

export const authApi = {
  me: async () => (await http.get('/auth/me')).data.user,
  login: async payload => (await http.post('/auth/login', payload)).data.user,
  signup: async payload => (await http.post('/auth/signup', payload)).data.user,
  logout: async () => http.post('/auth/logout'),
  checkUsername: async username => (await http.get('/auth/username/check', { params: { u: username } })).data,
  setUsername: async username => (await http.patch('/auth/username', { username })).data.user
};

export const creatorApi = {
  profile: async () => (await http.get('/creators/me')).data.item,
  updateProfile: async payload => (await http.patch('/creators/me', payload)).data.item,
  landingPage: async () => (await http.get('/landing-pages/me')).data.item,
  saveLandingPage: async payload => (await http.put('/landing-pages/me', payload)).data.item,
  publicCreator: async slug => (await http.get(`/creators/${slug}/public`)).data.item
};

export const analyticsApi = {
  dashboard: async () => (await http.get('/analytics/dashboard')).data.item
};

export const linksApi = {
  list: async () => (await http.get('/links')).data.item
};

export const instagramApi = {
  connection: async () => (await http.get('/instagram/connection')).data.item,
  connect: async payload => (await http.post('/instagram/connect', payload)).data.item
};

export const crmApi = {
  list: async params => (await http.get('/crm', { params })).data,
  detail: async id => (await http.get(`/crm/${id}`)).data.item
};

export const schedulerApi = {
  list: async () => (await http.get('/scheduler')).data.items
};

export const automationsApi = {
  list: async () => (await http.get('/automations')).data.item
};

export const productsApi = {
  list: async params => (await http.get('/products', { params })).data,
  detail: async id => (await http.get(`/products/${id}`)).data.item,
  publicBySlug: async slug => (await http.get(`/products/public/${slug}`)).data.item,
  create: async payload => (await http.post('/products', payload)).data.item
};

export const ordersApi = {
  list: async () => (await http.get('/orders')).data.items,
  checkout: async payload => (await http.post('/orders/checkout', payload)).data
};

export const settingsApi = {
  get: async () => (await http.get('/settings')).data.item,
  update: async payload => (await http.patch('/settings', payload)).data.item,
  mediaLibrary: async () => (await http.get('/settings/media-library')).data.items
};

export const adminApi = {
  overview: async () => (await http.get('/admin/overview')).data.item,
  users: async () => (await http.get('/admin/users')).data.items
};

