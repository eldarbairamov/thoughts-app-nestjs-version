import process from "process";

export default () => ({
   PORT: process.env.PORT || 5400,

   POSTGRES_HOST: process.env.POSTGRES_HOST,
   POSTGRES_PORT: process.env.POSTGRES_PORT,
   POSTGRES_DB: process.env.POSTGRES_DB || 'thoughts',
   POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
   POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,

   SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
   SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY
})