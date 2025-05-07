import { getRickMortyData } from "@/httpServices/api/getRickMortyData";
import { RickAndMortyResponse } from "@/types/rickMortyAPITypes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Paginator } from "../ui/Paginator";
import Spinner from "../ui/Spinner";
import { CharacterCard } from "./CharacterCard";

export default function CharactersList() {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [data, setData] = useState<RickAndMortyResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                const response = await getRickMortyData(
                    String(import.meta.env.VITE_BASE_API_URL),
                    `/character?page=${page}`
                );
                setData(response);
            } catch (error) {
                console.error("Error fetching characters:", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacters();
    }, [page]);

    if (isLoading) return <Spinner />;
    if (hasError || !data) return <p>{t("characterList.error")}</p>;

    return (
        <Characters className='characters'>
            <CharactersTitle className='characters__title'>
                {t("title")}
            </CharactersTitle>
            <CharactersGrid className='characters__grid'>
                {data.results.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </CharactersGrid>
            <CharactersPagination className='characters__paginator'>
                <Paginator
                    info={data.info}
                    currentPage={page}
                    onPageChange={setPage}
                />
            </CharactersPagination>
        </Characters>
    );
}

const Characters = styled.section`
    padding: 2rem;
`;

const CharactersTitle = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const CharactersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    justify-items: center;
    align-items: stretch;
`;

const CharactersPagination = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;
