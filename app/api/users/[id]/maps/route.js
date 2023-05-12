import Map from "@models/map";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const maps = await Map.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(maps), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch maps created by user", { status: 500 })
    }
} 