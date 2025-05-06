export const getRickMortyData = jest.fn(() =>
    Promise.resolve({
        info: { count: 2, pages: 1, next: null, prev: null },
        results: [
            { id: 1, name: "Rick Sanchez", image: "rick.png" },
            { id: 2, name: "Morty Smith", image: "morty.png" }
        ]
    })
);
