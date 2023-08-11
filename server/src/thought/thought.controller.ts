import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ThoughtService } from "./thought.service";
import { AccessGuard } from "../auth/guard/access.guard";
import { User } from "../common/decorator/user.decorator";
import { CreateThoughtDto } from "./dto/create-thought.dto";

@Controller( { path: "thoughts" } )
export class ThoughtController {

  constructor( private thoughtService: ThoughtService ) {
  }

  @UseGuards( AccessGuard )
  @Get()
  async getAll(
    @User( "userId" ) userId: number ) {

    return this.thoughtService.getAll( userId );
  }

  @UseGuards( AccessGuard )
  @Post()
  async create(
    @User( "userId" ) userId: number,
    @Body() dto: CreateThoughtDto ) {

    return this.thoughtService.create( dto.content, userId );
  }

  @UseGuards( AccessGuard )
  @Delete( ":thoughtId" )
  async delete(
    @User( "userId" ) userId: number,
    @Param( "thoughtId" ) thoughtId: number ) {

    await this.thoughtService.delete( userId, thoughtId );
    return { message: "success" };
  }

}