import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ThoughtModel } from "./model/thought.model";
import { IThought, IThoughts } from "./interface/thought.interface";

@Injectable()
export class ThoughtService {

   constructor( @InjectModel( ThoughtModel ) private thoughtModel: typeof ThoughtModel ) {
   }

   async getAll( ownerId: number, limit: number ): Promise<IThoughts> {
      const [ thoughtList, count ] = await Promise.all( [
         this.thoughtModel.findAll( {
            where: {
               ownerId
            },
            limit
         } ),
         this.thoughtModel.count()
      ] );

      return { data: thoughtList, count };
   }

   async create( content: string, ownerId: number ): Promise<IThought> {
      return this.thoughtModel.create( { content: content, ownerId } );
   }

   async delete( ownerId: number, thoughtId: number, limit: number ): Promise<IThoughts> {
      const target = await this.thoughtModel.findByPk( thoughtId );
      if ( !target ) throw new HttpException( "Requested object does not exists", HttpStatus.BAD_REQUEST );

      await this.thoughtModel.destroy( { where: { ownerId, id: thoughtId } } );

      const [ thoughtList, count ] = await Promise.all( [
         this.thoughtModel.findAll( {
            where: {
               ownerId
            },
            limit
         } ),
         this.thoughtModel.count()
      ] );

      return { data: thoughtList, count };
   }

}