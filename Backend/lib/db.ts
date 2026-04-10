import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/school-mng');

        console.log(`
🍃 MongoDB Connected!
🖥️  Host: ${conn.connection.host}
📂 Database: ${conn.connection.name}
        `);
    } catch (error: any) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;