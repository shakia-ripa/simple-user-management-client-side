import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {admin} = useAuth();
    if(admin){
        return children;
    }

    return (
        <div>
            <h2 className="text-3xl">This page only can be seen by admins</h2>
        </div>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;