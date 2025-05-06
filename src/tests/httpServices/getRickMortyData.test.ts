import { describe, expect, it, vi } from "vitest";

vi.mock("@/httpServices/api/getHarryPotterData", () => {
    return {
        getRickMortyData: vi.fn((BASE_URL?: string, ENDPOINT?: string) => {
            if (!BASE_URL || !ENDPOINT) {
                return Promise.reject(
                    new Error("No BASE_URL or ENDPOINT was provided")
                );
            }

            Promise.resolve({
                info: { count: 2, pages: 1, next: null, prev: null },
                results: [
                    { id: 1, name: "Rick Sanchez", image: "rick.png" },
                    { id: 2, name: "Morty Smith", image: "morty.png" }
                ]
            });
        })
    };
});

import { getRickMortyData } from "@/httpServices/api/getRickMortyData";

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
