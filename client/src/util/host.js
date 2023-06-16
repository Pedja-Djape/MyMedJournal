
const getBackendHostname = () => {
    return process.env.NODE_ENV === "production" ? "https://mymedjournal-backend.onrender.com/" : "http://localhost:8080"
}

export default getBackendHostname;