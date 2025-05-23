import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
}

interface CharacterCardProps {
    character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const { t } = useTranslation();
    const { name, image, status, species, gender, origin, location } =
        character;

    return (
        <Card className='character-card'>
            <Image className='character-card__image' src={image} alt={name} />
            <Content className='character-card__content'>
                <Name className='character-card__name'>{name}</Name>

                <TextLabel>{t("character.status")}</TextLabel>
                <Text className='character-card__text'>{status}</Text>

                <TextLabel>{t("character.species")}</TextLabel>
                <Text className='character-card__text'>{species}</Text>

                <TextLabel>{t("character.gender")}</TextLabel>
                <Text className='character-card__text'>{gender}</Text>

                <TextLabel>{t("character.origin")}</TextLabel>
                <Text className='character-card__text'>{origin.name}</Text>

                <TextLabel>{t("character.location")}</TextLabel>
                <Text className='character-card__text'>{location.name}</Text>
            </Content>
        </Card>
    );
};

const Card = styled.div`
    border: 1px solid #ccc;
    border-radius: 12px;
    overflow: hidden;
    max-width: 300px;
    min-width: 300px;
    min-height: 480px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    min-height: 300px;
    max-height: 390px;
    overflow: hidden;
    object-fit: cover;
`;

const Content = styled.div`
    padding: 16px;
`;

const Name = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 8px;
`;

const Text = styled.p`
    font-size: 0.95rem;
    margin: 2px 0;
    color: #444;
`;

const TextLabel = styled.strong`
    display: block;
    font-size: 0.85rem;
    color: #666;
    margin-top: 6px;
`;
