import {Outlet} from 'react-router-dom';
import Headers from './Headers';

const Main = () => {
    return (
        <div className='border-8 border-green-500 min-h-screen'>
            <Headers></Headers>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;