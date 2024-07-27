import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="base h-screen flex items-center justify-center">
                <div className="flex flex-row items-center font-extrabold">
                    <img className="w-36 h-36" src="../images/retry.svg" alt="" />
                    <div className="mt-4 ml-2 flex flex-col items-center">
                        <h1 className="homepage-title text-7xl font-extrabold text-[#eb986f]">
                            Zest Quest
                        </h1>
                        <button
                            className="mt-4 w-4/6 h-full py-2 rounded-full shadow-sm transition-transform duration-300 hover:scale-[1.04] focus:scale-[1.04] focus:outline-none focus:ring-4 focus:ring-[#d88760] active:scale-95 hover:shadow-lg bg-[#eb986f]"
                            onClick={() => navigate('/settings')}
                        >
                            <span className="text-lg uppercase font-extrabold text-white">
                                Play
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;