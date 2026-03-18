import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PrivateRoute = ({ children }) => {

    const { store } = useGlobalReducer();

    if (!store.token) {
        return <Navigate to="/" />;
    }

    return children;
};