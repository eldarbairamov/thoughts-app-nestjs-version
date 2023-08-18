import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { UserModel } from "../user/model/user.model";
import { ThoughtModel } from "../thought/model/thought.model";
import process from "process";

export const dbConfig: SequelizeModuleOptions = {
   dialect: "postgres",
   host: process.env.POSTGRES_HOST,
   port: +process.env.POSTGRES_PORT,
   database: process.env.POSTGRES_DB || 'thoughts',
   username: process.env.POSTGRES_USERNAME,
   password: process.env.POSTGRES_PASSWORD,
   models: [ UserModel, ThoughtModel ],
   logging: false,
   autoLoadModels: true,
};