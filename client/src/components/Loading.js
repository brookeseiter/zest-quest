function Loading() {
    return ( 
        <div className='flex space-x-2 justify-center items-center bg-[#D9EDBF] h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-12 w-12 bg-[#eb986f] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-12 w-12 bg-[#eb986f] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-12 w-12 bg-[#eb986f] rounded-full animate-bounce'></div>
        </div>
    );
}
 
export default Loading;
