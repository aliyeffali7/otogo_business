// src/productsApi.tsx
import api from "./../services/api";


export type ID = number | string;

export type ProductDTO = {
  id: ID;
  name: string;
  manufacturer?: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
  images?: string[];
  branchId?: ID;
};

// // ===== READ =====
// export const listProducts = async () => {
//   const { data } = await api.get<ProductDTO[]>("/products");
//   return data;
// };

// export const getProduct = async (id: ID) => {
//   const { data } = await api.get<ProductDTO>(`/products/${id}`);
//   return data;
// };

// export const listByBranch = async (branchId: ID) => {
//   const { data } = await api.get<ProductDTO[]>(`/products/by-branch/${branchId}`);
//   return data;
// };

// // ===== CREATE / UPDATE / DELETE =====
// export const createProduct = async (payload: {
//   name: string;
//   manufacturer?: string;
//   description?: string;
//   category?: string;
//   price?: number;
//   branchId?: ID;
// }) => {
//   const { data } = await api.post<ProductDTO>("/products", payload);
//   return data;
// };

// // Backend PUT /api/products — body-də id daxil olmaqla dəyişikliklər
// export const updateProduct = async (payload: {
//   id: ID;
//   name?: string;
//   manufacturer?: string;
//   description?: string;
//   category?: string;
//   price?: number;
// }) => {
//   const { data } = await api.put<ProductDTO>("/products", payload);
//   return data;
// };

// export const deleteProduct = async (id: ID) => {
//   await api.delete(`/products/${id}`);
//   return { ok: true };
// };

// // ===== BRANCH & PICTURES =====
// export const removeFromBranch = async (productId: ID, branchId: ID) => {
//   await api.delete(`/products/${productId}/branches/${branchId}`);
//   return { ok: true };
// };

// export const addPictures = async (productId: ID, files: File[]) => {
//   const fd = new FormData();
//   files.forEach((f) => fd.append("pictures", f)); // Swagger: POST /api/products/{productId}/pictures
//   const { data } = await api.post<ProductDTO>(`/products/${productId}/pictures`, fd, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };

// export const deletePicture = async (pictureId: ID) => {
//   await api.delete(`/products/pictures/${pictureId}`);
//   return { ok: true };
// };

export const listProducts = async () => (await api.get("/api/products")).data;
export const getProduct = async (id: number | string) => (await api.get(`/api/products/${id}`)).data;
export const createProduct = async (body: any) => (await api.post("/api/products", body)).data;
export const updateProduct = async (body: any) => (await api.put("/api/products", body)).data;
export const deleteProduct = async (id: number | string) => { await api.delete(`/api/products/${id}`); return {ok:true}; };
export const listByBranch = async (branchId: number | string) => (await api.get(`/api/products/by-branch/${branchId}`)).data;
export const removeFromBranch = async (productId: number | string, branchId: number | string) => { await api.delete(`/api/products/${productId}/branches/${branchId}`); return {ok:true}; };
export const addPictures = async (productId: number | string, files: File[]) => {
  const fd = new FormData(); files.forEach(f=>fd.append("pictures", f));
  return (await api.post(`/api/products/${productId}/pictures`, fd, { headers: { "Content-Type": "multipart/form-data" } })).data;
};
export const deletePicture = async (pictureId: number | string) => { await api.delete(`/api/products/pictures/${pictureId}`); return {ok:true}; };

