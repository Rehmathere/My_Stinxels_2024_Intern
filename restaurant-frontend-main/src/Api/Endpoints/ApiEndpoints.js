import api from "../Interceptor/Api";

const authEndpoint = "authenticated";

const unauthEndpoint = "unauthenticated";

export const getMenu = () => api.get(`${authEndpoint}/admin/menu`);

export const addMenu = (menuItem) =>
  api.post(`${authEndpoint}/admin/menu`, menuItem);

export const updateMenu = (menuItem) =>
  api.patch(`${authEndpoint}/admin/menu`, menuItem);

export const deleteMenu = (menuItemId) =>
  api.delete(`${authEndpoint}/admin/menu?${menuItemId.toString()}`);
