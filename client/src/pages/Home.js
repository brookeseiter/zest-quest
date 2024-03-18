import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <p>Zest Quest</p>
                <button onClick={() => navigate('/settings')}>Play</button>
            </div>
        </>
    );
}

export default Home;