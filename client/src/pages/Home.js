import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Loading from "../components/Loading";


function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="base h-screen flex items-center justify-center">
                <div className="flex flex-row items-center font-extrabold">
                    <img 
                        className="w-36 h-36 animate-bounce" 
                        src="../images/ZQ-logo.svg" 
                        alt="" 
                    />
                    <div className="flex flex-col items-center mt-4 ml-2">
                        <h1 className="modak text-between-7-8xl text-[#eb986f]">
                            Zest Quest
                        </h1>
                        <button
                            className="mt-2 w-4/6 h-full py-2 rounded-full shadow-sm transition-transform duration-300 hover:scale-[1.04] focus:scale-[1.04] focus:outline-none focus:ring-4 focus:ring-[#d88760] active:scale-95 hover:shadow-lg bg-[#eb986f]"
                            onClick={() => navigate('/settings')}
                        >
                            <span className="text-lg uppercase font-extrabold text-white">
                                Start
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;