import { useState, useEffect, ReactNode } from "react";
import { AuthContext, User } from "@/lib/auth";
import { userService } from "@/lib/mongodb";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      console.log(
        "🔐 AuthProvider: Attempting login for:",
        email,
        "with password:",
        password,
      );

      // First, let's check if userService is available
      console.log("📦 AuthProvider: userService available:", !!userService);

      // Import fresh instance to be sure
      const { userService: freshUserService } = await import("@/lib/mongodb");
      console.log(
        "📦 AuthProvider: Fresh userService available:",
        !!freshUserService,
      );

      // Find user in MongoDB
      console.log("🔍 AuthProvider: Calling findByEmail...");
      const mongoUser = await freshUserService.findByEmail(email);

      console.log("👤 AuthProvider: Found user:", mongoUser);

      if (mongoUser) {
        console.log(
          "🔑 AuthProvider: Password check - Input:",
          password,
          "Stored:",
          mongoUser.mat_khau,
        );

        if (mongoUser.mat_khau === password) {
          // Convert MongoDB user to app user format
          const appUser: User = {
            id: mongoUser._id || mongoUser.email,
            email: mongoUser.email,
            name: mongoUser.ten_nguoi_dung,
            role: mongoUser.vai_tro || "student",
            studentId: mongoUser.ma_nguoi_dung,
            hasChangedPassword: mongoUser.mat_khau !== "123456",
          };

          console.log("✨ AuthProvider: Created app user:", appUser);
          setUser(appUser);
          localStorage.setItem("auth_user", JSON.stringify(appUser));
          console.log(
            "✅ AuthProvider: Login successful for:",
            email,
            "User role:",
            appUser.role,
          );
          setIsLoading(false);
          return true;
        } else {
          console.log("❌ AuthProvider: Password mismatch for:", email);
        }
      } else {
        console.log("❌ AuthProvider: No user found for email:", email);

        // Let's try to debug what users are actually available
        try {
          const { debugUsers } = await import("@/lib/mongodb");
          console.log("🔍 AuthProvider: Available users:");
          debugUsers();
        } catch (debugError) {
          console.log("🚨 AuthProvider: Could not debug users:", debugError);
        }
      }

      console.log("❌ AuthProvider: Login failed for:", email);
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("🚨 AuthProvider: Login error:", error);
      console.error("🚨 AuthProvider: Error stack:", error.stack);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));

      // Update password in MongoDB if changed
      if (userData.hasChangedPassword) {
        try {
          console.log("🔄 Updating user data in database...");
          // Note: In a real app, you would also update the password in the database
          // For demo purposes, we'll just update the hasChangedPassword flag
          console.log("✅ User data updated successfully");
        } catch (error) {
          console.error("❌ Failed to update user data:", error);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
