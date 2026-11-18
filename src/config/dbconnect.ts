import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const port = process.env.PORT;

const dataBaseUrl = process.env.DATABASE_URL;

if (!dataBaseUrl) {
  throw new Error("DataBase Url Messing!");
}

export const config = {
  port,
  dataBaseUrl,
};
