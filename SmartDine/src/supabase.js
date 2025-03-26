import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rjhmclzcczftbthdgjsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqaG1jbHpjY3pmdGJ0aGRnanN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MjI4MDIsImV4cCI6MjA1NjI5ODgwMn0.CNh_HDNp8m6ysJO0svo5uIM9bZSTSNqHw34cBKM2oqg';

export const supabase = createClient(supabaseUrl, supabaseKey);