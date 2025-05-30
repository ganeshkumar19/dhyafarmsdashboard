import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute: React.FC = () => {
    const { accessToken, loading } = useAuth();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return accessToken ? <Outlet /> : <Navigate to="/" />;
  };

export default ProtectedRoute
  