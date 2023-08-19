import { BeforeCreate, BeforeUpdate, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ThoughtModel } from "../../thought/model/thought.model";
import bcrypt from "bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";

interface UserAttr {
  readonly id: number
  readonly username: string,
  readonly email: string,
  readonly password: string
  readonly thoughts: ThoughtModel
}

interface UserCreationAttr {
  username: string,
  email: string,
  password: string
}

@Table( { timestamps: false, tableName: "users" } )
export class UserModel extends Model<UserAttr, UserCreationAttr> {

  @Column( { type: DataType.STRING, allowNull: false, unique: true } )
  username: string;

  @Column( { type: DataType.STRING, allowNull: false, unique: true } )
  email: string;

  @Column( { type: DataType.STRING, allowNull: false } )
  password: string;

  @HasMany( () => ThoughtModel )
  thoughts: ThoughtModel[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPass( instance: UserModel ): Promise<void> {
    instance.password = await bcrypt
      .hash( instance.password, 8 )
      .catch( () => {
        throw new HttpException( "Bcrypt: Error", HttpStatus.INTERNAL_SERVER_ERROR );
      } );
  }

}