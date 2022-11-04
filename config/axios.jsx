import axios from 'axios';

// Cliente axios
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
})

export default clienteAxios;