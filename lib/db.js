import mongoose from "mongoose"

const mongouri = process.env.MONGODB_URI;

if(!mongouri) throw new Error("Missing MONGODB_URI")

/* Handling a global connection to MongoDB in a Node.js application is important for efficient resource management and performance optimization.
 By maintaining a single connection to the MongoDB database, you avoid the overhead of repeatedly establishing and closing connections, which can be resource-intensive and slow. */
/* In serverless environments, the application may reinitialize frequently, and creating a new database connection each time can be inefficient. By storing the connection in a global variable, you can reuse it across invocations. */

let cached = global.mongoose;
if(!cached) {cached = global.mongoose = {conn: null, promise: null}};

async function connectDB() {
    if (cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = await mongoose.connect(mongouri).then((m) => m);
    }

    cached.conn = await cached.promise
    return cached.conn;
}

export default connectDB