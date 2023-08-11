import { UserModel } from "../../user/model/user.model";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface OAuthAttr {
  readonly id: number,
  readonly accessToken: string,
  readonly refreshToken: string,
  readonly ownerId: number,
  readonly owner: UserModel
}

interface OAuthCreationAttr {
  readonly accessToken: string,
  readonly refreshToken: string,
  readonly ownerId: number
}

@Table( { timestamps: false, tableName: "oAuths" } )
export class OAuthModel extends Model<OAuthAttr, OAuthCreationAttr> {

  @Column( { type: DataType.STRING, allowNull: false } )
  accessToken: string;

  @Column( { type: DataType.STRING, allowNull: false } )
  refreshToken: string;

  @ForeignKey( () => UserModel )
  @Column( { type: DataType.INTEGER, allowNull: false } )
  ownerId: number;

  @BelongsTo( () => UserModel )
  owner: UserModel;
}