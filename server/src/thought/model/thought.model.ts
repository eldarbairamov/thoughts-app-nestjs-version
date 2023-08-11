import { BeforeCreate, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../../user/model/user.model";

interface ThoughtAttr {
  readonly id: number
  readonly content: string,
  readonly ownerId: number,
  readonly owner: UserModel
  readonly date: Date
}

interface ThoughtCreationAttr {
  readonly content: string,
  readonly ownerId: number
}

@Table( { tableName: "thoughts", timestamps: false } )
export class ThoughtModel extends Model<ThoughtAttr, ThoughtCreationAttr> {

  @Column( { type: DataType.TEXT, allowNull: false } )
  content: string;

  @ForeignKey(() => UserModel)
  @Column( { type: DataType.INTEGER, allowNull: false } )
  ownerId: number;

  @Column( { type: DataType.BIGINT, allowNull: true } )
  date: number;

  @BelongsTo( () => UserModel)
  owner: UserModel;

  @BeforeCreate
  static async setMsDate( instance: ThoughtModel ) {
    instance.date = new Date().getTime();
  }

}