import { Module } from "@nestjs/common";
import { ThoughtService } from "./thought.service";
import { ThoughtController } from "./thought.controller";
import { ThoughtModel } from "./model/thought.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module( {
  providers: [ ThoughtService ],
  controllers: [ ThoughtController ],
  imports: [ SequelizeModule.forFeature( [ ThoughtModel ] ) ]
} )
export class ThoughtModule {

}