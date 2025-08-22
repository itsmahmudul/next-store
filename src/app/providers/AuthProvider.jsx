// src/providers/AuthProvider.js
"use client";

import { SessionProvider, useSession } from "next-auth/react";

// Main provider component
export default function AuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}

// Custom hook to get user only
export function useAuth() {
    const { data: session, status } = useSession();
    
    return {
        user: session?.user,
        loading: status === "loading"
    };
}