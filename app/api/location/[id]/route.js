import Location from "@models/location";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const locations = await Location.find({ map: params.id });

        return new Response(JSON.stringify(locations), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all locations", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Location.findByIdAndRemove(params.id);

        return new Response("Successfully deleted location", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete location", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, description, image } = await request.json();
    try {
        await connectToDB();

        const existingLocation = await Location.findById(params.id);

        if(!existingLocation) return new Response("Location not found", { status: 404 });

        existingLocation.title = title;
        existingLocation.description = description;
        existingLocation.image = image;

        await existingLocation.save();

        return new Response(JSON.stringify(existingLocation), { status: 200 });
    } catch (error) {
        return new Response("Error updating location", { status: 500 });
    }
}