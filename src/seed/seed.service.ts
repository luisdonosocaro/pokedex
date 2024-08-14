import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { map } from 'rxjs';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';



@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios

  constructor(
    private httpService: HttpService,
    private pokemonService: PokemonService
  ) {

  }

  async executeSeed() {

   await this.pokemonService.purge();

/*     return this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      .pipe(
        map(response => {
          const pokemonDTO: CreatePokemonDto = {
            no: response.data.results
          }
    
          
          response.data.results
      })
      ); */


    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert = []
    
    data.results.forEach(async ({ name, url }) => {
      const segment = url.split("/");
      const no: number = +segment[segment.length - 2];
      pokemonToInsert.push({name, no})
    })

    await this.pokemonService.insertMany(pokemonToInsert);

    return "Seed executed";
  }

}
