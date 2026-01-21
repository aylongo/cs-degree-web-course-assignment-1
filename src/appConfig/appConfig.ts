import "dotenv/config";

interface iAppConfig {
  port: number;
  mongoDb: {
    host: string;
    port: number;
    dbName: string;
  };
}

export const appConfig: iAppConfig = {
  port: +(process.env.PORT || "3000"),
  mongoDb: {
    host: process.env.MONGODB_HOST || "localhost",
    port: +(process.env.MONGODB_PORT || "27017"),
    dbName: process.env.MONGODB_DB_NAME || "assignment1",
  },
};
