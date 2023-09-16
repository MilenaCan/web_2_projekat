import axiosInstance from "./axiosConfig";
import { OrderModel, ProductModel } from "../models/models";

const getProducts = async () => {
  try {
    const res = await axiosInstance.get("api/buyer/products");
    return res.data ? res.data.map((o) => new ProductModel(o)) : [];
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getOrders = async () => {
  try {
    const res = await axiosInstance.get("api/buyer/orders");
    return res.data ? res.data.map((o) => new OrderModel(o)) : [];
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const postOrder = async (data) => {
  try {
    await axiosInstance.post("api/buyer/order", data);
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const postCancel = async (id) => {
  try {
    await axiosInstance.post("api/buyer/cancel-order/" + id);
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const getPrice = async (data) => {
  try {
    const res = await axiosInstance.post("api/buyer/price", data);
    return res.data;
  } catch (e) {
    alert(e.response.data.Exception);
    return Promise.reject(e);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProducts,
  postOrder,
  getOrders,
  postCancel,
  getPrice,
};
