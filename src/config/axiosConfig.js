import axios from "axios";

// ✅ Let Vercel proxy handle baseURL
// ❌ DO NOT set baseURL to the full backend URL
axios.defaults.withCredentials = true;

export default axios;
