
const getBackendHostname = () => {
    return process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_BACKEND_HOST}` : "http://localhost:8080"
}

export default getBackendHostname;