import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const apiUrl = `${BASE_URL}/api/cards`;

export const getCards = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received for the request:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const createCard = async (card) => {
  try {
    const { data } = await axios.post(apiUrl, card);
    return data;
  } catch (error) {
    console.error("Error creating card:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received for the request:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const updateCard = async (cardId, updatedCard) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${cardId}`, updatedCard);
    return data;
  } catch (error) {
    console.error("Error updating card:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received for the request:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${cardId}`);
    return data;
  } catch (error) {
    console.error("Error deleting card:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received for the request:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};
