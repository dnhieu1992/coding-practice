import { config } from 'dotenv';
import { resolve } from 'path';
import * as mysql from 'mysql2/promise';

// Load environment variables
const envPath = resolve(process.cwd(), '.env');
console.log('Loading .env from:', envPath);
console.log('Current working directory:', process.cwd());

const result = config({ path: envPath });

if (result.error) {
  console.warn('Error loading .env:', result.error.message);
  // Try loading without path (default behavior)

  config();
}

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Host:', process.env.DB_HOST);
  console.log('Port:', process.env.DB_PORT);
  console.log('User:', process.env.DB_USER);
  console.log('Database:', process.env.DB_NAME);

  try {
    const host = 'localhost';
    const port = Number(process.env.DB_PORT) || 3306;
    const user = process.env.DB_USER || 'notification';
    const password = process.env.DB_PASS || 'notification_password';
    const database = process.env.DB_NAME || 'notification_db';
    const socketPath = process.env.DB_SOCKET_PATH;

    const baseConnectionOptions = socketPath
      ? { socketPath, user, password, connectTimeout: 5000 }
      : { host, port, user, password, connectTimeout: 5000 };

    // Ensure the database exists before connecting to it.
    const adminConnection = await mysql.createConnection({
      ...baseConnectionOptions,
    });
    await adminConnection.query(
      `CREATE DATABASE IF NOT EXISTS ${mysql.escapeId(database)}`,
    );
    await adminConnection.end();

    const connection = await mysql.createConnection({
      ...baseConnectionOptions,
      database,
    });

    console.log('✅ Connection successful!');
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

void testConnection();
