import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    // const { gameSettings } = location.state;

    return (
        <>
            <div>
                <p>Results Screen</p>
            </div>
        </>
    );
}

export default Results;