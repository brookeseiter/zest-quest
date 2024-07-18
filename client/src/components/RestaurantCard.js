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


function RestaurantCard({ classStyles, restaurant })  {
    return (
        <>
            {/* <Card className={`h-2/5 flex flex-col justify-start items-center w-96 bg-white rounded-2xl gap-5 cursor-pointer transition ease-in-out duration-300 hover:scale-105 hover:-translate-y-1 ${classStyles}`}>
                <CardHeader className="h-3/5 w-3/5 flex justify-center items-center flex-grow-0 flex-shrink-0">
                    {restaurant.image_url && (
                        <img 
                            // className="h-full w-full object-cover md:h-48 lg:h-56"
                            className="size-full s-42"
                            src={restaurant.image_url}
                            alt={`${restaurant.name}`}
                        />
                    )}
                </CardHeader>
                <CardBody className="h-2/5 w-full flex-grow overflow-y-auto p-4">
                    <h1>
                        {restaurant.name}
                    </h1>
                    <h1>
                        {restaurant.rating}
                    </h1>
                    <h1>
                        {restaurant.price}
                    </h1>
                    <h1>
                        {restaurant.address}
                    </h1>
                    <div> 
                        {restaurant.categories.map((category, i) => (
                            <p className="flex flex-col" key={i}>
                                {i !== restaurant.categories.length - 1 ? category.title + ',' : category.title}
                            </p>
                        ))}
                    </div>
                    <p>
                        {restaurant.location.address1}
                    </p>
                </CardBody>
            </Card> */}
            {/* <div class="wrapper antialiased text-gray-900"> */}
            <div className="flex w-full h-full justify-center items-center antialiased text-gray-900">
                <div>
                    {restaurant.image_url && (
                        <img 
                            className="w-full object-cover object-center rounded-lg shadow-md"
                            src={restaurant.image_url}
                            alt={`${restaurant.name}`}
                        />
                    )} 
                    <div class="relative px-4 -mt-16">
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <div class="flex items-baseline">
                                <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                    New
                                </span>
                                <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                    2 baths  &bull; 3 rooms
                                </div>  
                            </div>
                            <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">{restaurant.name}</h4>
                            <div class="flex justify-center mt-1">
                                {restaurant.categories.map((category, i) => (
                                    <p className="flex flex-col" key={i}>
                                        {i !== restaurant.categories.length - 1 ? category.title + ',' : category.title}
                                    </p>
                                ))}
                            </div>
                            <div class="mt-4">
                                <span class="text-teal-600 text-md font-semibold">{restaurant.rating}/5 ratings </span>
                                {/* <span class="text-sm text-gray-600">(based on 234 ratings)</span> */}
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantCard;