import CharactersList from "@/components/CharactersList";
import { render, screen, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";

vi.mock("@/httpServices/api/getRickMortyData", () => ({
    getRickMortyData: vi.fn()
}));

import { getRickMortyData } from "@/httpServices/api/getRickMortyData";

describe("CharacterList", () => {
    beforeEach(() => {
        (getRickMortyData as Mock).mockResolvedValue({
            info: { count: 2, pages: 1, next: null, prev: null },
            results: [
                {
                    id: 1,
                    name: "Rick Sanchez",
                    image: "rick.png",
                    status: "Alive",
                    species: "Human",
                    gender: "Male",
                    origin: {
                        name: "Earth (C-137)",
                        url: "https://example.com/origin1"
                    },
                    location: {
                        name: "Citadel of Ricks",
                        url: "https://example.com/location1"
                    }
                },
                {
                    id: 2,
                    name: "Morty Smith",
                    image: "morty.png",
                    status: "Alive",
                    species: "Human",
                    gender: "Male",
                    origin: {
                        name: "Earth (Replacement Dimension)",
                        url: "https://example.com/origin2"
                    },
                    location: {
                        name: "Earth",
                        url: "https://example.com/location2"
                    }
                }
            ]
        });
    });

    it("should render characters correctly", async () => {
        render(<CharactersList />);

        await waitFor(() => {
            expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
            expect(screen.getByText("Morty Smith")).toBeInTheDocument();

            expect(screen.getByAltText("Rick Sanchez")).toHaveAttribute(
                "src",
                "rick.png"
            );
            expect(screen.getByAltText("Morty Smith")).toHaveAttribute(
                "src",
                "morty.png"
            );

            expect(screen.getAllByText("Alive")).toHaveLength(2);
            expect(screen.getAllByText("Human")).toHaveLength(2);
            expect(screen.getAllByText("Male")).toHaveLength(2);

            expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
            expect(
                screen.getByText("Earth (Replacement Dimension)")
            ).toBeInTheDocument();

            expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
            expect(screen.getByText("Earth")).toBeInTheDocument();
        });
    });
});
