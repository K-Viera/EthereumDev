const {expect} = require("chai");
const { ethers } = require('hardhat');

describe('PokemonFactory', () => {
    it('should return a pokemon', async () => {
        const PokemonFactory = await ethers.getContractFactory('PokemonFactory');
        const pokemonFactory = await PokemonFactory.deploy();
        await pokemonFactory.createPokemon('pikachu',1,[0,1,2],[0,1],[0]);
        await pokemonFactory.createPokemon('charmander',2,[1,2,3],[1,2],[1,2]);
        const pokemons = await pokemonFactory.getAllPokemons();
        console.log(pokemons);
        expect(pokemons.length).to.equal(2);
    });
    it('should fail if set an invalid skill', async () => {
        const PokemonFactory = await ethers.getContractFactory('PokemonFactory');
        const pokemonFactory = await PokemonFactory.deploy();
        await expect(pokemonFactory.createPokemon('test',1,[545],[0,1],[0])).to.be.revertedWith('Pokemon skills, types and weaknesses must be valid');
    });
    it('should fail if set an empty name', async () => {
        const PokemonFactory = await ethers.getContractFactory('PokemonFactory');
        const pokemonFactory = await PokemonFactory.deploy();
        await expect(pokemonFactory.createPokemon('',1,[0],[0,1],[0])).to.be.revertedWith('Name must be at least 2 characters long');
    });
});