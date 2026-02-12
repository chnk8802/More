import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div className="text-slate-600 dark:text-slate-400 text-center mt-20">Loading...</div>; // Or a nice spinner
    }

    // Temporary: Allow access without token for testing
    return <Outlet />;
};

export default PrivateRoute;
