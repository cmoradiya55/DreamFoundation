-- Dream Foundation Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Event Users Table
CREATE TABLE IF NOT EXISTS event_users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    mobile_country_code VARCHAR(5) NOT NULL DEFAULT '+91',
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    aadhar_number VARCHAR(12) NOT NULL,
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Children Table
CREATE TABLE IF NOT EXISTS event_children (
    id SERIAL PRIMARY KEY,
    event_user_id INTEGER NOT NULL REFERENCES event_users(id) ON DELETE CASCADE,
    child_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    mother_name VARCHAR(255) NOT NULL,
    child_aadhar VARCHAR(12) NOT NULL,
    child_date_of_birth DATE NOT NULL,
    education_standard VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admission Users Table
CREATE TABLE IF NOT EXISTS admission_users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    mobile_country_code VARCHAR(5) NOT NULL DEFAULT '+91',
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    aadhar_number VARCHAR(12) NOT NULL,
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admission Children Table
CREATE TABLE IF NOT EXISTS admission_children (
    id SERIAL PRIMARY KEY,
    admission_user_id INTEGER NOT NULL REFERENCES admission_users(id) ON DELETE CASCADE,
    child_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    mother_name VARCHAR(255) NOT NULL,
    child_aadhar VARCHAR(12) NOT NULL,
    child_date_of_birth DATE NOT NULL,
    education_standard VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_users_registration_id ON event_users(registration_id);
CREATE INDEX IF NOT EXISTS idx_event_users_email ON event_users(email);
CREATE INDEX IF NOT EXISTS idx_event_users_mobile ON event_users(mobile);
CREATE INDEX IF NOT EXISTS idx_event_children_user_id ON event_children(event_user_id);

CREATE INDEX IF NOT EXISTS idx_admission_users_registration_id ON admission_users(registration_id);
CREATE INDEX IF NOT EXISTS idx_admission_users_email ON admission_users(email);
CREATE INDEX IF NOT EXISTS idx_admission_users_mobile ON admission_users(mobile);
CREATE INDEX IF NOT EXISTS idx_admission_children_user_id ON admission_children(admission_user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_event_users_updated_at BEFORE UPDATE ON event_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_children_updated_at BEFORE UPDATE ON event_children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admission_users_updated_at BEFORE UPDATE ON admission_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admission_children_updated_at BEFORE UPDATE ON admission_children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE event_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_children ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public insert on event_users" ON event_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on event_children" ON event_children FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on admission_users" ON admission_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on admission_children" ON admission_children FOR INSERT WITH CHECK (true);

-- Allow public read access (optional - remove if you want to restrict)
CREATE POLICY "Allow public read on event_users" ON event_users FOR SELECT USING (true);
CREATE POLICY "Allow public read on event_children" ON event_children FOR SELECT USING (true);
CREATE POLICY "Allow public read on admission_users" ON admission_users FOR SELECT USING (true);
CREATE POLICY "Allow public read on admission_children" ON admission_children FOR SELECT USING (true);
