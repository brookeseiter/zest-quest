import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="base h-screen bg-cover bg-[#D9EDBF] content-center">
                <div className="flex justify-center items-center font-extrabold">
                    <img src="../images/retry.svg" alt="" />
                    <h1 className="text-[#eb9e78] text-7xl homepage-title text-">Zest Quest</h1>
                </div>
                <div className="flex justify-center">
                    <button 
                        className="button px-24 py-3 bg-[#eb9e78] rounded-full shadow-md transition-shadow"
                        onClick={() => navigate('/settings')}
                    >
                        <h1 className="text-[#D9EDBF] text-base font-extrabold">Play</h1>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;