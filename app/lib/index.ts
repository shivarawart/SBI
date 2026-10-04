import { initializeOwnerDatabase } from "./owner.schema";
import { initializeVideoDatabase } from "./video.schema";
import { initializeFeedbackDatabase } from "./feedback.schema";

export async function initializeDatabase() {
    await initializeOwnerDatabase();
    await initializeVideoDatabase();
     await initializeFeedbackDatabase();
}
