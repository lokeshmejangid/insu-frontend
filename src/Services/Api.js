import axios from "axios";
//base url
const instance = axios.create({
  baseURL: "https://insu-backend-9dr5.onrender.com",
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


//add client item
export const addClient = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post("/api/client/add", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//category item
export const getAllClient = async () => {
  try {
    const response = await instance.get("/api/client/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};


//update update
export const updateClient = async (payload, id) => {
  try {
    console.log(payload, id)
    const response = await instance.put(`/api/client/update/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//delete category
export const deleteClient = async (id) => {
  try {
    const response = await instance.delete(`/api/client/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


//login
export const login = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post("/api/auth/signin", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//add client item
export const addInsurance = async (payload) => {
  try {
    console.log(payload);
    const response = await instance.post("/api/insurance/add", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//category item
export const getAllInsurance = async () => {
  try {
    const response = await instance.get("/api/insurance/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};


//update update
export const updateInsurance = async (payload, id) => {
  try {
    console.log(payload)
    const response = await instance.put(`/api/insurance/update/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//delete category
export const deleteInsurance = async (id) => {
  try {
    const response = await instance.delete(`/api/insurance/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//update update
export const getAllDashboard = async () => {
  try {
    const response = await instance.get(`/api/dashboard/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
