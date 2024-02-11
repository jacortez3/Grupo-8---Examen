import { createClient } from '@supabase/supabase-js';

// To be more secure: .env file. 
const supabaseURL = "https://bdvqyafbthbxmmvxxvds.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdnF5YWZidGhieG1tdnh4dmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NjEyMjMsImV4cCI6MjAyMjIzNzIyM30.xbhF8-HG2XlVQGqF41Y6QXCiaMpmeSUZfxWerQ_okZ4";

export const supabase = createClient(supabaseURL, supabaseAnonKey);