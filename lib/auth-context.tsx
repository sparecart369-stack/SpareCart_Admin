"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

interface SuperAdminUser {
  username: string;
  name: string;
  role: string;
  loginTime: string;
}

interface SuperAdminAuthContextType {
  isAuthenticated: boolean;
  user: SuperAdminUser | null;
  isLoading: boolean;
  login: (usernameInput: string, passwordInput: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const SuperAdminAuthContext = createContext<SuperAdminAuthContextType | undefined>(undefined);

const SUPERADMIN_USERNAME = "sparecartadmin";
const SUPERADMIN_PASSWORD = "8590925382";
const AUTH_STORAGE_KEY = "sparecart_superadmin_auth";

export function SuperAdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<SuperAdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsedUser = JSON.parse(storedAuth);
        if (parsedUser && parsedUser.username === SUPERADMIN_USERNAME) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        }
      }
    } catch (e) {
      console.error("Failed to parse auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUsername = usernameInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    // Accept sparecartadmin or salahkoyilandy@gmail.com or sparecartadmin@sparekart.com
    const isUsernameMatch =
      cleanUsername === SUPERADMIN_USERNAME ||
      cleanUsername === "salahkoyilandy@gmail.com" ||
      cleanUsername === `${SUPERADMIN_USERNAME}@sparekart.com` ||
      cleanUsername.startsWith(SUPERADMIN_USERNAME);

    if (isUsernameMatch && cleanPassword === SUPERADMIN_PASSWORD) {
      const adminUser: SuperAdminUser = {
        username: SUPERADMIN_USERNAME,
        name: "Super Admin",
        role: "Super Administrator & Founder",
        loginTime: new Date().toISOString(),
      };

      setIsAuthenticated(true);
      setUser(adminUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));

      return { success: true };
    }

    return {
      success: false,
      error: "Invalid Super Admin credentials. Please check your username and password.",
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    router.push("/admin/login");
  };

  return (
    <SuperAdminAuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </SuperAdminAuthContext.Provider>
  );
}

export function useSuperAdminAuth() {
  const context = useContext(SuperAdminAuthContext);
  if (!context) {
    throw new Error("useSuperAdminAuth must be used within a SuperAdminAuthProvider");
  }
  return context;
}
