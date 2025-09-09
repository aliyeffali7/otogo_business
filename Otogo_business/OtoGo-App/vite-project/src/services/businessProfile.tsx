import api from "./api";

export const businessProfile = async () => {
  try {
    const response = await api.get("/api/professional-profiles");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRatings= async()=>{
    try {
        const res = await api.get("")
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}