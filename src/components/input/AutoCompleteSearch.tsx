"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AutoComplete, Button, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";

const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
    }
  }
`;

const AutoCompleteSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [options, setOptions] = useState<{ value: string; id: string }[]>([]);
  const [searchValue, setSearchValue] = useState(searchQuery);

  const { data, loading } = useQuery(GET_POKEMONS, {
    variables: { first: 200 },
  });

  useEffect(() => {
    if (data?.pokemons) {
      setOptions(
        data.pokemons.map((pokemon: { id: string; name: string }) => ({
          value: pokemon.name,
          id: pokemon.id,
        }))
      );
    }

    if (searchQuery) {
      setSearchValue(searchQuery);
    }
  }, [data, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (data?.pokemons) {
      const filtered = data.pokemons
        .filter((pokemon: { name: string }) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((pokemon: { name: string }) => ({
          value: pokemon.name,
        }));

      setOptions(filtered.length > 0 ? filtered : []);
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value: string) => {
    setSearchValue(value);
    if (value) {
      router.push(`?search=${encodeURIComponent(value)}`);
    } else {
      setSearchValue("");
      router.push("/");
    }
  };

  const handleQueryChange = () => {

    if (searchValue) {
      router.push(`?search=${encodeURIComponent(searchValue)}`);
    } else {
      setSearchValue("");
      router.push("/");
    }

  };

  const handleReset = () => {
    setSearchValue("");
    router.push("/");
  };

  // กด enter แล้วให้เรียก handleQueryChange
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQueryChange();
    }
  };

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <AutoComplete
        style={{ width: 200 }}
        options={options}
        placeholder="ค้นหาโปเกมอน"
        value={searchValue}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown} // เพิ่มการตรวจสอบ Enter
        filterOption={false}
      />
      <div className="space-x-2">
        <Button type="primary" onClick={handleQueryChange}>
          Search
        </Button>
        {searchValue && (
          <Button
            type="default"
            onClick={handleReset}
            icon={<CloseCircleOutlined />}
          >
            ล้าง
          </Button>
        )}
        </div>
    </div>
  );
};

export default AutoCompleteSearch;
