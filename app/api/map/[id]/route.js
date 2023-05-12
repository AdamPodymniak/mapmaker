import Map from "@models/map";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const map = await Map.findById(params.id).populate("creator");

        return new Response(JSON.stringify(map), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch map", { status: 500 })
    }
}