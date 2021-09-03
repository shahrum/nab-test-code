import axios from "axios";

// I have used REQ / RES to test front-end against a real API
const instance = axios.create({
	baseURL: "https://reqres.in/"
});

// have assigned it to instance as we might need to have interceptor on request response like global error logging like:
// instance.interceptors.request ...
export default instance;
