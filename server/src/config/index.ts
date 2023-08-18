import process from "process";

export default () => ({
   PORT: process.env.PORT ,

   SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
   SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY
})