import React, { useEffect, useState } from "react";
import { fetchPokemon } from "../services/api";

const UserGroup = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchPokemon(4);
      setPokemon(data);
    };
    getPokemon();
  }, []);

  return (
    <div className="flex -space-x-3">
      {pokemon.map((p, index) => (
        <img
          key={index}
          src={p.sprites.front_default} 
          alt={p.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
      ))}
    </div>
  );
};

export default UserGroup;
