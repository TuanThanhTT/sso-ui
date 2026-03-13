import axios from "axios"

export const axiosClient = axios.create({
  baseURL: "http://172.16.1.11:5001/api",
  headers: {
    "Content-Type": "application/json"
  }
})