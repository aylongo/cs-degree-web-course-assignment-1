import { appConfig } from "./appConfig/appConfig";
import { connectDB } from "./db";
import { initExpress } from "./express";

const PORT = appConfig.port;

const initApp = async () => {
  try {
    const app = initExpress();
    await connectDB();
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.error("Error initializing app", error);
  }
};

initApp();
