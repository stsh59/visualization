import { BigQuery } from "@google-cloud/bigquery";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";

import token from "@/lib/token";
import hash from "@/lib/hash";
import config from "@/config";

const bigQuery = new BigQuery();
const datasetId = config.bigquery.datasetId;
const tableId = "users";

const signup = async (name: string, email: string, password: string) => {
  if (!email || !name || !password) {
    throw Error("All the fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email address is not valid");
  }

  const userExistsQuery = `SELECT COUNT(*) as count FROM ${datasetId}.${tableId} WHERE email = @email`;
  const [userExistsResult] = await bigQuery.query({
    query: userExistsQuery,
    params: { email },
  });

  if (userExistsResult[0].count) {
    throw Error("User with this email address already exists");
  }

  const hashedPassword = await hash.generate(password);
  const insertQuery = `INSERT INTO ${datasetId}.${tableId} (id, name, email, password) VALUES (@id, @name, @email, @password)`;
  await bigQuery.query({
    query: insertQuery,
    params: { id: uuidv4(), name, email, password: hashedPassword },
  });
  return insertQuery;
};

const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("All the fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email address is not valid");
  }

  const query = `SELECT * FROM ${datasetId}.${tableId} WHERE email = @email`;
  const options = {
    query: query,
    params: { email: email },
  };

  try {
    const [rows] = await bigQuery.query(options);

    if (rows.length === 0) {
      throw new Error("User with this email address doesn't exist");
    }

    const user = rows[0];

    const isPasswordCorrect = await hash.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw Error("Password is incorrect");
    }

    const accessToken = token.generate({
      payload: { _id: user.id, name: user.name, email: user.email },
      type: "access",
    });

    return {
      token: accessToken,
      _id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error logging in");
  }
};

const getMe = async (id: string) => {
  const query = `SELECT name, email FROM ${datasetId}.${tableId} WHERE id = @id`;
  const options = {
    query: query,
    params: { id: id },
  };

  try {
    const [rows] = await bigQuery.query(options);

    if (rows.length === 0) {
      throw new Error("User doesn't exist");
    }

    const user = rows[0];

    return {
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    throw new Error("Error fetching user details");
  }
};

export default { signup, login, getMe };
