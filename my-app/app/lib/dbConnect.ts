import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers([]);

const MONGODB_URI = process.env.MONGODB_URI as string || process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing");
}

type MongoCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalMongo = globalThis as typeof globalThis & {
  mongoCache?: MongoCache;
};

const cache: MongoCache =
  globalMongo.mongoCache ??
  (globalMongo.mongoCache = {
    connection: null,
    promise: null,
  });

export async function dbConnect() {
  // Already connected
  if (cache.connection && mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB already connected");

    return cache.connection;
  }

  // Existing connection attempt
  if (cache.promise) {
    console.log("⏳ Waiting for MongoDB connection...");

    return cache.promise;
  }

  console.log("🔄 Connecting to MongoDB...");
  console.log("MongoDB URI exists:", Boolean(MONGODB_URI));

  cache.promise = mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,

      // IMPORTANT
      bufferCommands: false,
    })
    .then((mongooseInstance) => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("✅ MONGODB CONNECTED");
      console.log("Host:", mongooseInstance.connection.host);
      console.log("Database:", mongooseInstance.connection.name);
      console.log("ReadyState:", mongooseInstance.connection.readyState);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━");

      cache.connection = mongooseInstance;

      return mongooseInstance;
    })
    .catch((error) => {
      cache.promise = null;
      cache.connection = null;

      console.error("❌ MONGODB CONNECTION FAILED");
      console.error(error);

      throw error;
    });

  return cache.promise;
}
