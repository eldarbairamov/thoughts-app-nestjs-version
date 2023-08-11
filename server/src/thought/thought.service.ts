import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ThoughtModel } from "./model/thought.model";

@Injectable()
export class ThoughtService {

  constructor( @InjectModel( ThoughtModel ) private thoughtModel: typeof ThoughtModel ) {
  }

  async getAll( ownerId: number ) {
    return this.thoughtModel.findAll( {
      where: {
        ownerId
      }
    } );
  }

  async create( content: string, ownerId: number ) {
    return this.thoughtModel.create( { content: content, ownerId } );
  }

  async delete( ownerId: number, thoughtId: number ) {
    const target = await this.thoughtModel.findByPk(thoughtId)
    if (!target) throw new HttpException('Requested object does not exists', HttpStatus.BAD_REQUEST)

    return this.thoughtModel.destroy( { where: { ownerId, id: thoughtId } } );
  }

}