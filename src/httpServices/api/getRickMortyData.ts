import { RickAndMortyResponse } from "@/types/rickMortyAPITypes";
import { HttpClient } from "../base/httpClient";

export const getRickMortyData = async (
    BASE_URL: string,
    ENDPOINT: string
): Promise<RickAndMortyResponse> => {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("No BASE_URL or ENDPOINT was provided");
    }

    const { data } = await HttpClient(BASE_URL, 3000).get<RickAndMortyResponse>(
        ENDPOINT
    );

    return data;
};
