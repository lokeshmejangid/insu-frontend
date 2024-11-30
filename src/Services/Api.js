import axios from "axios";
//base url
const instance = axios.create({
    baseURL: "https://insu-backend.onrender.com",
    //baseURL: "http://localhost:3007",
    headers: {
      'Content-Type': 'application/json',
    }
  });


//add category item
export const addCategory = async (payload) => {
    try {
      console.log(payload);
      const response = await instance.post("/api/category/add", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //category item
export const getAllCetegory = async () => {
    try {
      const response = await instance.get("/api/category/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  };


//update update
export const updateCategory = async (payload, id) => {
    try {
      console.log(payload, id)
      const response = await instance.put(`/api/category/update/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //delete category
export const deleteCategory = async (id) => {
  try {
    const response = await instance.delete(`/api/category/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  //add Policies item
  export const getAllPolicies = async () => {
    try {
      const response = await instance.get("/api/policies/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //add category item
export const addPolicy = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post("/api/policies/add", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 //update update
export const updatePolicy = async (payload, id) => {
  try {
    console.log(payload, id)
    const response = await instance.put(`/api/policies/update/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  //delete category
  export const deletePolicy = async (id) => {
    try {
      const response = await instance.delete(`/api/policies/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
