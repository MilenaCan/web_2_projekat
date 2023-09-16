import axiosInstance from "./axiosConfig";
import { OrderModel, ProductModel } from "../models/models";

const getNewOrders = async () => {
  try {
    const res = await axiosInstance.get("api/seller/new-orders");
    return res.data ? res.data.map((o) => new OrderModel(o)) : [];
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getMyOrders = async () => {
  try {
    const res = await axiosInstance.get("api/seller/orders");
    return res.data ? res.data.map((o) => new OrderModel(o)) : [];
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getProducts = async () => {
  try {
    const res = await axiosInstance.get("api/seller/products");
    return res.data ? res.data.map((o) => new ProductModel(o)) : [];
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getProduct = async (id) => {
  try {
    const res = await axiosInstance.get("api/seller/products/" + id);
    return res.data ? new ProductModel(res.data) : null;
  } catch (e) {
    alert(e.response.data.Exception);
    return null;
  }
};

const putProduct = async (data) => {
  try {
    await axiosInstance.put("api/seller/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const postProduct = async (data) => {
  try {
    await axiosInstance.post("api/seller/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const postApprove = async (id) => {
  try {
    await axiosInstance.post("api/seller/orders/approve/" + id);
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete("api/seller/products/" + id);
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNewOrders,
  getMyOrders,
  getProducts,
  getProduct,
  putProduct,
  postProduct,
  deleteProduct,
  postApprove,
};
