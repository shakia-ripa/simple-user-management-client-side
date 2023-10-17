import useAuth from "../hooks/useAuth";


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

export default PrivateRoute;