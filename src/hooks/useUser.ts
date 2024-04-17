"use client";
import { UserType } from "@/interfaces/user";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useUser() {
  const [session, setSession] = useState<Session | null>(null);
  console.log(session);
  const [user, setUser] = useState<UserType | null>(null);
  console.log(user);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/user/${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      }
    };
    setupUser();
  }, [session]);

  function signUp({ email, password }: { email: string; password: string }) {
    return supabase.auth.signUp({ email, password });
  }

  function signIn({ email, password }: { email: string; password: string }) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  function signOut() {
    return supabase.auth.signOut();
  }

  return { user, session, signUp, signIn, signOut };
}
