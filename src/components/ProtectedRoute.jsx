import { Navigate } from 'react-router-dom';
import { usePokeverse } from '../context/PokeverseContext';

function ProtectedRoute({ children }) {
    const {state } = usePokeverse();
    if (!state.trainer) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;