import { IsNotEmpty, IsString } from "class-validator";

export class CreateThoughtDto {

  @IsString()
  @IsNotEmpty()
  readonly content: string

}