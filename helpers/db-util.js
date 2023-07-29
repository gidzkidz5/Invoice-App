import { MongoClient } from "mongodb";

export default async function connectDatabase() {
    const client = await MongoClient.connect(
        "mongodb+srv://gideon100:140993@eventspage-newsletter.m6bgxuu.mongodb.net/InvoicesDB?retryWrites=true&w=majority"
    )

    return client;
}