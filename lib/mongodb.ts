// Mock MongoDB connection for preview
export default Promise.resolve({} as any)

export async function getDatabase() {
  // Mock database for preview
  return {
    collection: (name: string) => ({
      find: () => ({
        toArray: () => Promise.resolve([]),
        sort: () => ({ toArray: () => Promise.resolve([]) }),
      }),
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ insertedId: "mock-id" }),
      insertMany: () => Promise.resolve({ insertedIds: ["mock-id"] }),
      updateOne: () => Promise.resolve({ modifiedCount: 1 }),
      deleteOne: () => Promise.resolve({ deletedCount: 1 }),
      countDocuments: () => Promise.resolve(0),
    }),
  } as any
}
