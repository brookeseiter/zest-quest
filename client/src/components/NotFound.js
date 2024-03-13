import { Link } from "react-router-dom";

function NotFound() {
    return ( 
        <div className='not-found'>
            <h2>Sorry,</h2>
            <p>We were unable to find that page.</p>
            <Link to='/profile'>Return to My Profile</Link>
        </div>
     );
}
 
export default NotFound;