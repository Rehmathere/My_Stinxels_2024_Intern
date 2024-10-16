import api from "../Interceptor/Api";

const authEndpoint = "authenticated";

const unauthEndpoint = "unauthenticated";

export const signUp = (body) => api.post(`${unauthEndpoint}/sign-up`, body);

export const signIn = (body) => api.post(`${unauthEndpoint}/sign-in`, body);

export const getMenu = () => api.get(`${authEndpoint}/admin/menu`);

export const addMenu = (menuItem) =>
  api.post(`${authEndpoint}/admin/menu`, menuItem);

export const updateMenu = (menuItem) =>
  api.patch(`${authEndpoint}/admin/menu`, menuItem);

export const deleteMenu = (menuItemId) =>
  api.delete(`${authEndpoint}/admin/menu?${menuItemId.toString()}`);

export const getBranch = () => api.get(`${authEndpoint}/admin/branch`);

export const addBranch = (branch) =>
  api.post(`${authEndpoint}/admin/branch`, branch);

export const updateBranch = (branch) =>
  api.patch(`${authEndpoint}/admin/branch`, branch);

export const deleteBranch = (branchId) =>
  api.delete(`${authEndpoint}/admin/branch?${branchId.toString()}`);
