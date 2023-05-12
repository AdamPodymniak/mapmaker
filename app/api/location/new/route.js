import Location from "@models/location";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { mapId, title, description, image, lat, lng, layer } = await request.json();

    try {
        await connectToDB();
        const newLocation = new Location({ map: mapId, title, description, image, lat, lng, layer });

        await newLocation.save();
        return new Response(JSON.stringify(newLocation), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new map", { status: 500 });
    }
}