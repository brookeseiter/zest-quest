function RestaurantCard({ restaurant })  {
    return (
        <>
            <div>
                <img 
                    src={restaurant.image_url}
                    alt={`${restaurant.name}_logo`}
                />
                <h1>
                    {restaurant.name}
                </h1>
                <h1>
                    {restaurant.rating}
                </h1>
                <div>
                    {restaurant.categories.map((category, i) => (
                        <>
                            {i !== restaurant.categories.length - 1 ? <p>
                                {category.title},
                            </p> : <p>
                                {category.title}
                            </p>}
                        </>
                    ))}
                </div>
                <p>
                    {restaurant.location.address1}
                </p>
            </div>
        </>
    );
}

export default RestaurantCard;