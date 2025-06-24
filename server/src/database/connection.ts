import { Sequelize, Model } from "sequelize-typescript";
import { envConfig } from "../../config/config";

if (!envConfig.databaseUrl) {
  throw new Error("Database URL not defined.");
}
const sequelizeObject = new Sequelize(envConfig.databaseUrl, {
  dialect: "postgres",
});
sequelizeObject.addModels([__dirname + "/models"]);

sequelizeObject 
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelizeObject.sync({ force: false})
.then ( () => {
  console.log("Database synchronized with new changes successfully.");
})

export default sequelizeObject;