import Map from "@models/map";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const maps = await Map.find({}).populate('creator')

        return new Response(JSON.stringify(maps), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all maps", { status: 500 })
    }
}