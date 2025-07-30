import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odkmrcqjhezcrgjmusax.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ka21yY3FqaGV6Y3Jnam11c2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDE5NDksImV4cCI6MjA2OTQ3Nzk0OX0.WNg-0nWLrIyGNJBFyCHKuNOzHHBfu9Z50C3YAelWRHM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
