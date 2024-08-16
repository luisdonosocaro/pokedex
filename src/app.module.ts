import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),

// -- select url, 'http://localhost:3000/api/files/product/' || url from product_images;

// -- update product_images set url = 'http://localhost:3000/api/files/product/' || url


    
    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'pokemonsdb'
    }),
    
    PokemonModule,

    CommonModule,

    SeedModule,

  ],
})
export class AppModule {

  constructor(){
    console.log(process.env)
  }

}
