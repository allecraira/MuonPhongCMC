import { describe, it, expect } from "vitest";
import { connectMongoDB } from "./testConnection";

describe("connectMongoDB", () => {
  it("should connect to MongoDB successfully", async () => {
    const isConnected = await connectMongoDB();
    expect(isConnected).toBe(true);
  });
}); 