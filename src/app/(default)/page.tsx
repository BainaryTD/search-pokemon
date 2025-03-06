import PokemonCard from "@/components/card/PokemonCard";
import AutoCompleteSearch from "@/components/input/AutoCompleteSearch";

export default function Home() {
  return (
    <>
    <div className="flex justify-center">
      <div className="w-full max-w-7xl gap-2">
        <div className="flex justify-end">
          <AutoCompleteSearch />
        </div>
        <div className="pt-5">
          <PokemonCard />
        </div>
      </div></div>
    </>
  );
}
