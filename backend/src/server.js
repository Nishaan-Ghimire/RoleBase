import { app } from "./app.js";
import connectDB from "./utils/db.js";

const PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGODB connection failed!`, error);
  });
