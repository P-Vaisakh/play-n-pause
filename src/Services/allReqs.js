import { base } from "./base";
import { request } from "./request";

export const postData = async (data) => {
  return await request("POST", `${base}/videos`, data);
};

export const getData = async () => {
  return await request("GET", `${base}/videos`, {});
};

export const deleteData = async (id) => {
  return await request("delete", `${base}/videos/${id}`);
};

export const postCollection = async (data) => {
  return await request("POST", `${base}/collections`, data);
};

export const getCollection = async () => {
  return await request("Get", `${base}/collections`, {});
};

export const deleteCollection = async (id) => {
  return await request("DELETE", `${base}/collections/${id}`, {});
};

export const setHistory = async (data) => {
  return await request("post", `${base}/histories`, data);
};

export const getHistory=async()=>{
  return await request("Get", `${base}/histories` , {})
}

export const deleteHistory=async(id)=>{
  return await request("delete", `${base}/histories/${id}`, {} )
}

export const getSingleVideo=async(id)=>{
  return await request("get", `${base}/videos/${id}` , {})
}

export const putVideo = async (colId,data) => {
  return await request("put", `${base}/collections/${colId}`, data);
};

export const getSingleCollection=async(id)=>{
  return await request("get", `${base}/collections/${id}`,{})
}