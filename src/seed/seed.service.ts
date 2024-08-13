import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';



@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios

  constructor(
    private httpService: HttpService
  ){

  }

  async executeSeed(){
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    data.results.forEach(({name, url}) => {
      
      const segment = url.split("/");
      const no: number = +segment[segment.length - 2];
      console.log({name, no});
    })
    return data.results;
  }

}
