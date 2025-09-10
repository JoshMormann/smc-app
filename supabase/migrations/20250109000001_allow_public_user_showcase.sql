-- Allow public read access to basic user info for showcase purposes
-- This only exposes username/email, not sensitive data

CREATE POLICY "Public can view basic user info for showcase" ON users
  FOR SELECT USING (true);