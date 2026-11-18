import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const port = Number(process.env.PORT || 5000);
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DataBase Url is not Connected");
}

const config = {
  port,
  databaseUrl,
};

export default config;
