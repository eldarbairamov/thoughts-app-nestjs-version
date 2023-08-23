import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ThoughtService } from "./thought.service";
import { AccessGuard } from "../auth/guard/access.guard";
import { User } from "../common/decorator/user.decorator";
import { CreateThoughtDto } from "./dto/create-thought.dto";
import { IThought, IThoughts } from "./interface/thought.interface";

@Controller( { path: "thoughts" } )
export class ThoughtController {

   constructor( private thoughtService: ThoughtService ) {
   }

   @UseGuards( AccessGuard )
   @Get()
   async getAll(
       @Query( "limit" ) limit: number,
       @User( "userId" ) userId: number ): Promise<IThoughts> {

      return this.thoughtService.getAll( userId, limit );
   }

   @UseGuards( AccessGuard )
   @Post()
   async create(
       @User( "userId" ) userId: number,
       @Body() dto: CreateThoughtDto ): Promise<IThought> {

      return this.thoughtService.create( dto.content, userId );
   }

   @UseGuards( AccessGuard )
   @Delete( ":thoughtId" )
   async delete(
       @User( "userId" ) userId: number,
       @Query( "limit" ) limit: number,
       @Param( "thoughtId" ) thoughtId: number ): Promise<IThoughts> {

      return this.thoughtService.delete( userId, thoughtId, limit );
   }

}