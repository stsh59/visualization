import dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    port: process.env.PORT,
  },
  bigquery: {
    datasetId: process.env.DATASET_ID,
  },
  session: {
    secret: "visualisation-session-secret",
    resave: false,
    saveUninitialized: false,
  },
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },
  },
};

export default config;
