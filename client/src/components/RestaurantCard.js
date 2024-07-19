import { 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Typography, 
    Card, 
    Input,
    Select, 
    Option, 
    Radio,
    Button 
} from "@material-tailwind/react";

function RestaurantCard({ restaurant })  {
    const distanceMiles = restaurant.distance * 0.00062137;
    console.log(restaurant);
    return (
        <>
            <div className="flex w-full h-full justify-center items-center antialiased text-gray-900">
                <div className="w-full transition ease-in-out duration-300 hover:scale-105 hover:-translate-y-1 ">
                    {restaurant.image_url && (
                        <div className="w-full h-96 overflow-hidden rounded-lg shadow-md flex-grow-0 flex-shrink-0">
                            <img 
                                className="h-full w-full object-cover object-center rounded-lg shadow-md"
                                src={restaurant.image_url}
                                alt={`${restaurant.name}`}
                            />
                        </div>
                    )} 
                    <div className="relative px-4 -mt-16">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                                <span className="bg-[#eb986f] text-white text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                    {restaurant.price}
                                </span>
                                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                    {distanceMiles.toFixed(2)} mi away
                                </div>  
                            </div>
                            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{restaurant.name}</h4>
                            <div className="flex justify-center mt-1">
                                <p className="flex flex-wrap text-base font-light">
                                    {restaurant.categories.map((category, i) => (
                                        <span key={i} className="inline">
                                            {category.title}{i !== restaurant.categories.length - 1 && ' •\u00A0'}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="mt-4">
                                <span className="text-[#eb986f] text-md font-bold">{restaurant.rating}/5 rating </span>
                                <span class="text-sm text-gray-600">({restaurant.review_count} reviews)</span>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantCard;