function Game() {
    
    fetch(`/yelp-api`)
        .then((response) => response.json())
        .then((yelpData) => console.log(yelpData))
        .catch((error) => console.log('error: ', error), []); 

    return (
        <>
        <div>
            <p>Game Screen</p>
        </div>
        </>
    );
}

export default Game;