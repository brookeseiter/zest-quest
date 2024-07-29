import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";


function NotFound() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return ( 
        <div className='base h-screen flex flex-col justify-center items-center'>
            <h1 className="text-9xl modak">404</h1>
            <h2 className="text-xl font-bold">Oops, looks like you're lost!</h2>
            <p className="text-sm">The page you were looking for doesn't exist.</p>
            <Button 
                className="rounded-full shadow-sm mt-8 hover:scale-[1.03] focus:scale-[1.03] active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#d88760] hover:shadow-lg bg-[#eb986f]" 
                size="lg" 
                type="button"
                variant="filled"
                onClick={handleButtonClick}
            >
                Return Home
            </Button>
        </div>
    );
}
 
export default NotFound;