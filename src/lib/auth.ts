import { createContext, useContext } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "admin" | "pctsv" | "security";
  studentId?: string;
  hasChangedPassword: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock users for demo - in production these would come from MongoDB
export const mockUsers: User[] = [
  {
    id: "1",
    email: "student1@cmc.edu.vn",
    name: "Nguyễn Văn A",
    role: "student",
    studentId: "SV001234",
    hasChangedPassword: false,
  },
  {
    id: "2",
    email: "teacher1@cmc.edu.vn",
    name: "TS. Trần Thị B",
    role: "teacher",
    hasChangedPassword: false,
  },
  {
    id: "3",
    email: "admin@cmc.edu.vn",
    name: "Admin System",
    role: "admin",
    hasChangedPassword: true,
  },
  {
    id: "4",
    email: "pctsv@cmc.edu.vn",
    name: "Phòng CTSV",
    role: "pctsv",
    hasChangedPassword: true,
  },
  {
    id: "5",
    email: "security@cmc.edu.vn",
    name: "Bảo vệ",
    role: "security",
    hasChangedPassword: true,
  },
];
