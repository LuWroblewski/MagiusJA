import { Client } from 'pg';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const user = process.env.PGUSER;
const host = process.env.PGHOST;
const database = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;

const userEmail = process.env.USER_EMAILTESTE;
const pass = process.env.USER_PASSWORD;

export const client = new Client({
  connectionString: `postgresql://${user}:${password}${host}/${database}`,
  ssl: true, // Certifique-se de habilitar o SSL ao se conectar ao ElephantSQL
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
