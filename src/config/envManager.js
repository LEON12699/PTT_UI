const EnvManager = Object.freeze(
    {
        BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
        GOOGLE_MAP_KEY: process.env.REACT_APP_MAP_API_KEY
    }
);

export default EnvManager;