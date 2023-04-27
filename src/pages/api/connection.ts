import { Client } from 'pg';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;

const userEmail = process.env.USER_EMAILTESTE;
const pass = process.env.USER_PASSWORD;

export const client = new Client({
  user: user,
  host: host,
  database: database,
  password: password,
  port: 5432,
});

client.connect();

export default client;

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: `${userEmail}`,
    pass: `${pass}`,
  },
});
