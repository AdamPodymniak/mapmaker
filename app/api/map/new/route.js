import Map from "@models/map";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, title, tags } = await request.json();

    try {
        await connectToDB();
        const newMap = new Map({ creator: userId, title, tags });

        await newMap.save();
        return new Response(JSON.stringify(newMap), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new map", { status: 500 });
    }
}