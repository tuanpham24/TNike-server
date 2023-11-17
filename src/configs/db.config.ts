import mongoose from "mongoose";

const connect = async (): Promise<void> => {
  const dbUserName: string | undefined = process.env.DB_USERNAME;
  const dbPassword: string | undefined = process.env.DB_PASSWORD;
  const dbCluster: string | undefined = process.env.DB_CLUSTER;
  const dbName: string | undefined = process.env.DB_NAME;

  if (!dbUserName || !dbPassword || !dbCluster || !dbName) {
    console.error(
      "Missing MongoDB connection information in environment variables."
    );
    return;
  }

  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}.v7dwzn9.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Connect db successfully");
  } catch (error) {
    console.error("Connect db failure: " + error);
  }
};

export default connect;
