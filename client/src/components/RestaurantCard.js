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
    return (
        <>
            <Card className="h-2/5 flex flex-col justify-start items-center w-96 bg-white rounded-2xl gap-5 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12">
                <CardHeader className="h-3/5 w-3/5 flex justify-center items-center flex-grow-0 flex-shrink-0">
                    {restaurant.image_url && (
                        <img 
                            className="h-full w-full object-cover md:h-48 lg:h-56"
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
            </Card>
        </>
    );
}

export default RestaurantCard;