import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

let connection;

const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ MySQL connected successfully!');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
};

// Optional: export connection for queries
export { connection };
export default connectDB;
