// app/pokemon/[id]/page.tsx
"use client";

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { Card, Skeleton, Tag, Spin } from "antd";

const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: String!) {
    pokemon(id: $id) {
      number
      name
      weight { minimum maximum }
      height { minimum maximum }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      attacks {
        fast { name type damage }
        special { name type damage }
      }
      evolutions {
        id
        number
        name
        image
        types
      }
      image
    }
  }
`;

const typeColors: { [key: string]: string } = {
  Fire: "volcano",
  Water: "blue",
  Electric: "gold",
  Grass: "green",
  Ice: "cyan",
  Fighting: "red",
  Poison: "purple",
  Ground: "orange",
  Flying: "geekblue",
  Psychic: "magenta",
  Bug: "lime",
  Rock: "brown",
  Ghost: "dark",
  Dragon: "purple",
  Dark: "default",
  Steel: "gray",
  Fairy: "pink",
};

const PokemonDetail: React.FC = () => {
  const params = useParams();
  const rawId = params.id as string;
  const router = useRouter();

  const decodedId = decodeURIComponent(rawId);

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: decodedId },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center my-6">
        <Spin size="large" />
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const pokemon = data?.pokemon;

  if (!pokemon) {
    return <p className="text-center text-lg my-10">Pokémon not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card
        cover={<img src={pokemon.image} alt={pokemon.name} className="h-72 object-contain p-4" />}
        className="shadow-none !border-0 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-2">
          #{pokemon.number} {pokemon.name}
        </h2>
        <p>Classification: {pokemon.classification}</p>
        <p>Height: {pokemon.height.minimum} - {pokemon.height.maximum}</p>
        <p>Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
        <p>Max CP: {pokemon.maxCP}</p>
        <p>Flee Rate: {pokemon.fleeRate}</p>

        <div className="mt-4">
          <h3 className="font-semibold">Types:</h3>
          {pokemon.types.map((type: string) => (
            <Tag color={typeColors[type] || "red"} key={type}>{type}</Tag>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Weaknesses:</h3>
          {pokemon.weaknesses.map((weakness: string) => (
            <Tag color={typeColors[weakness] || "red"} key={weakness}>{weakness}</Tag>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Attacks (Fast):</h3>
          {pokemon.attacks.fast.map((attack: any) => (
            <p key={attack.name}>{attack.name} ({attack.type}) - {attack.damage} damage</p>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Attacks (Special):</h3>
          {pokemon.attacks.special.map((attack: any) => (
            <p key={attack.name}>{attack.name} ({attack.type}) - {attack.damage} damage</p>
          ))}
        </div>

        {pokemon.evolutions && (
          <div className="mt-4">
            <h3 className="font-semibold">Evolutions:</h3>
            <div className="flex gap-4">
              {pokemon.evolutions.map((evo: any) => (
                <Card
                  key={evo.number}
                  className="w-32 cursor-pointer"
                  cover={<img src={evo.image} alt={evo.name} className="p-2 h-28 object-contain" />}
                  onClick={() => router.push(`/pokemon/${evo.id}`)}
                >
                  <Card.Meta title={evo.name} description={evo.types.join(", ")} />
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};


export default PokemonDetail;