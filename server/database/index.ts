import mongoose from 'mongoose';

const connection = {
    isConnected: 0,
};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Database Already Connected');
        return;
    }
    const db = await mongoose.connect('mongodb://localhost:27017/next-js');

    connection.isConnected = db.connections[0].readyState;
    console.log('Database Connected', connection.isConnected);
}

export default dbConnect;
