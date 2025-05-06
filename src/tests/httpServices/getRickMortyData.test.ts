import { getRickMortyData } from "@/httpServices/api/getRickMortyData";
import { describe, expect, it } from "vitest";

describe("getRickMortyData", () => {
    it("should throw if no BASE_URL or endpoint is provided", async () => {
        await expect(getRickMortyData("url", "")).rejects.toThrow(
            "No BASE_URL or ENDPOINT was provided"
        );

        await expect(getRickMortyData("", "/asd")).rejects.toThrow(
            "No BASE_URL or ENDPOINT was provided"
        );
    });

    it("should return characters list object", async () => {
        const baseUrl = import.meta.env.VITE_BASE_API_URL;

        const data = await getRickMortyData(baseUrl, "/character");

        expect(data).toHaveProperty("results");
        expect(data.results.length).toBeGreaterThan(0);
        expect(data.info.count).toBeGreaterThan(1);
    });
});
