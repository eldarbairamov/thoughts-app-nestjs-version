import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { UserModel } from "../user/model/user.model";
import { ThoughtModel } from "../thought/model/thought.model";
import config from "./index";

export const dbConfig: SequelizeModuleOptions = {
   dialect: "postgres",
   host: config().POSTGRES_HOST,
   port: +config().POSTGRES_PORT,
   database: config().POSTGRES_DB,
   username: config().POSTGRES_USERNAME,
   password: config().POSTGRES_PASSWORD,
   models: [ UserModel, ThoughtModel ],
   logging: false,
   autoLoadModels: true,
};