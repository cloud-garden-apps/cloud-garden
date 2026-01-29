import { supabase } from "./supabase";

export type Thought = {
  id: string;
  content: string;
  ideas: string[] | null;
  created_at: string;
};

export const saveThought = async (content: string, ideas: string[]) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("thoughts")
    .insert({ user_id: user.id, content, ideas })
    .select()
    .single();

  if (error) throw error;
  return data as Thought;
};

export const getThoughts = async () => {
  const { data, error } = await supabase
    .from("thoughts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Thought[];
};

export const deleteThought = async (id: string) => {
  const { error } = await supabase.from("thoughts").delete().eq("id", id);
  if (error) throw error;
};
