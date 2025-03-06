"use client";

import React, { useState, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Skeleton, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const { Meta } = Card;

// GraphQL Query (ดึงโปเกมอนชุดแรกตามจำนวนที่กำหนด)
const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      types
    }
  }
`;

const PokemonCard: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || ""; // อ่านค่าจาก Query Parameter

    const [limit, setLimit] = useState(20);
    const [hasMore, setHasMore] = useState(true);
    const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);

    const observerRef = useRef<HTMLDivElement | null>(null);

    // ใช้ Apollo Query
    const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
        variables: { first: limit },
        notifyOnNetworkStatusChange: true,
    });

    // ฟังก์ชันกรองข้อมูลโปเกมอนตามชื่อที่พิมพ์
    useEffect(() => {
        if (data && data.pokemons) {
            if (searchQuery) {
                const filtered = data.pokemons.filter((pokemon: { name: string }) =>
                    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) // ค้นหาคำที่พิมพ์
                );
                setFilteredPokemons(filtered);
            } else {
                setFilteredPokemons(data.pokemons);
            }
        }
    }, [data, searchQuery]);

    // ฟังก์ชันโหลดข้อมูลเพิ่ม (ใช้กับ Infinite Scroll)
    const loadMore = () => {
        if (!hasMore) return;

        const oldLength = data?.pokemons.length || 0;

        fetchMore({
            variables: { first: limit + 50 },
        }).then((result) => {
            const newPokemons = result.data?.pokemons || [];
            const newLength = newPokemons.length;

            if (newLength === 0 || newLength === oldLength) {
                setHasMore(false);
            } else {
                setLimit((prev) => prev + 50);
                if (newLength - oldLength < 50) {
                    setHasMore(false);
                }
            }
        });
    };

    // ตั้งค่า Intersection Observer
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [loading, hasMore]);

    if (error) {
        return <p className="text-red-500 text-center">Error: {error.message}</p>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {loading && !data
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <Card key={index} className="w-60 rounded-lg shadow-md">
                            <Skeleton.Image className="p-2 h-52 object-contain" />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </Card>
                    ))
                    : filteredPokemons.map((pokemon: { id: string; name: string; image: string; types: string[] }) => (
                        <Card
                            key={pokemon.id}
                            className="w-60 text-center rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                            cover={
                                <img
                                    alt={pokemon.name}
                                    src={pokemon.image}
                                    className="p-2 h-52 object-contain"
                                    onClick={() => router.push(`/pokemon/${pokemon.id}`)} // 📌 ไปยังหน้า /pokemon/[id]
                                />
                            }
                        >
                            <Meta
                                title={pokemon.name}
                                description={pokemon.types.join(", ")}
                            />
                        </Card>
                    ))}
            </div>

            {loading && (
                <div className="flex justify-center my-6">
                    <Spin size="large" />
                </div>
            )}

            {!hasMore && (
                <div className="my-4 text-gray-500">
                    🎉 You have reached the end! (No more data)
                </div>
            )}

            {hasMore && <div ref={observerRef} className="h-10 w-full"></div>}
        </>
    );
};

export default PokemonCard;
