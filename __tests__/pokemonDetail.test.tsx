// __tests__/pokemonDetail.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import PokemonDetail, { GET_POKEMON_DETAIL } from '@/app/(default)/pokemon/[id]/page';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
    useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));


const mocks = [
    {
        request: {
            query: GET_POKEMON_DETAIL,
            variables: { id: '001' },
        },
        result: {
            data: {
                pokemon: {
                    number: '001',
                    name: 'Bulbasaur',
                    weight: { minimum: '6.04kg', maximum: '7.76kg' },
                    height: { minimum: '0.61m', maximum: '0.79m' },
                    classification: 'Seed Pokémon',
                    types: ['Grass', 'Poison'],
                    resistant: ['Water'],
                    weaknesses: ['Fire', 'Ice'],
                    fleeRate: 0.1,
                    maxCP: 951,
                    attacks: {
                        fast: [{ name: 'Tackle', type: 'Normal', damage: 12 }],
                        special: [{ name: 'Sludge Bomb', type: 'Poison', damage: 80 }],
                    },
                    evolutions: [
                        {
                            id: '002',
                            number: '002',
                            name: 'Ivysaur',
                            image: 'https://img.pokemondb.net/artwork/ivysaur.jpg',
                            types: ['Grass', 'Poison'],
                        },
                    ],
                    image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
                },
            },
        },
    },
];

describe('PokemonDetail Component', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: '001' });
    });

    it('renders Pokemon details correctly', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <PokemonDetail />
            </MockedProvider>
        );

        expect(document.querySelector('.ant-spin')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/#001 Bulbasaur/)).toBeInTheDocument();
            expect(screen.getByText(/Seed Pokémon/)).toBeInTheDocument();
            expect(screen.getByText(/Height: 0.61m - 0.79m/)).toBeInTheDocument();
            expect(screen.getByText(/Weight: 6.04kg - 7.76kg/)).toBeInTheDocument();
            expect(screen.getByText(/Max CP: 951/)).toBeInTheDocument();
            expect(screen.getByText(/Flee Rate: 0.1/)).toBeInTheDocument();
            expect(screen.getByText((_, el) => el?.textContent === 'Grass')).toBeInTheDocument();
            expect(screen.getByText((_, el) => el?.textContent === 'Poison')).toBeInTheDocument();
            expect(screen.getByText((_, el) => el?.textContent === 'Fire')).toBeInTheDocument();
            expect(screen.getByText((_, el) => el?.textContent === 'Ice')).toBeInTheDocument();

            // Check attacks
            expect(screen.getByText(/Tackle \(Normal\) - 12 damage/)).toBeInTheDocument();
            expect(screen.getByText(/Sludge Bomb \(Poison\) - 80 damage/)).toBeInTheDocument();

            // Check evolutions
            expect(screen.getByText('Ivysaur')).toBeInTheDocument();
        });
    });

    it('displays error when Pokémon is not found', async () => {
        const errorMocks = [
            {
                request: {
                    query: GET_POKEMON_DETAIL,
                    variables: { id: 'unknown' },
                },
                result: {
                    data: { pokemon: null },
                },
            },
        ];

        (useParams as jest.Mock).mockReturnValue({ id: 'unknown' });

        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <PokemonDetail />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Pokémon not found.')).toBeInTheDocument();
        });
    });
});
