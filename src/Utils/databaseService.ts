import { supabase } from '../lib/supabase';

export interface RegistrationData {
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  mobileCountryCode: string;
  email: string;
  address: string;
  aadharNumber: string;
  registrationId: string;
  children: Array<{
    childName: string;
    fatherName: string;
    motherName: string;
    childAadhar: string;
    childDateOfBirth: string;
    educationStandard: string;
  }>;
}

export class DatabaseService {
  // Event Registration Methods
  static async saveEventRegistration(data: RegistrationData) {
    try {
      // Insert event user data
      const { data: eventUser, error: userError } = await supabase
        .from('event_users')
        .insert({
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth,
          mobile: data.mobile,
          mobile_country_code: data.mobileCountryCode || '+91',
          email: data.email,
          address: data.address,
          aadhar_number: data.aadharNumber,
          registration_id: data.registrationId
        })
        .select()
        .single();

      if (userError) {
        throw new Error(`Failed to save event user: ${userError.message}`);
      }

      // Insert children data if any
      if (data.children && data.children.length > 0) {
        const childrenData = data.children.map((child) => ({
          event_user_id: eventUser.id,
          child_name: child.childName,
          father_name: child.fatherName,
          mother_name: child.motherName,
          child_aadhar: child.childAadhar,
          child_date_of_birth: child.childDateOfBirth,
          education_standard: child.educationStandard
        }));

        const { error: childrenError } = await supabase
          .from('event_children')
          .insert(childrenData);

        if (childrenError) {
          console.error('Error inserting event children:', childrenError);
          // Note: User data is already saved, children error is logged but not thrown
        }
      }

      return {
        success: true,
        userId: eventUser.id,
        registrationId: data.registrationId
      };
    } catch (error) {
      console.error('Error saving event registration:', error);
      throw error;
    }
  }

  // Admission Registration Methods
  static async saveAdmissionRegistration(data: RegistrationData) {
    try {
      // Insert admission user data
      const { data: admissionUser, error: userError } = await supabase
        .from('admission_users')
        .insert({
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth,
          mobile: data.mobile,
          mobile_country_code: data.mobileCountryCode || '+91',
          email: data.email,
          address: data.address,
          aadhar_number: data.aadharNumber,
          registration_id: data.registrationId
        })
        .select()
        .single();

      if (userError) {
        throw new Error(`Failed to save admission user: ${userError.message}`);
      }

      // Insert children data if any
      if (data.children && data.children.length > 0) {
        const childrenData = data.children.map((child) => ({
          admission_user_id: admissionUser.id,
          child_name: child.childName,
          father_name: child.fatherName,
          mother_name: child.motherName,
          child_aadhar: child.childAadhar,
          child_date_of_birth: child.childDateOfBirth,
          education_standard: child.educationStandard
        }));

        const { error: childrenError } = await supabase
          .from('admission_children')
          .insert(childrenData);

        if (childrenError) {
          console.error('Error inserting admission children:', childrenError);
          // Note: User data is already saved, children error is logged but not thrown
        }
      }

      return {
        success: true,
        userId: admissionUser.id,
        registrationId: data.registrationId
      };
    } catch (error) {
      console.error('Error saving admission registration:', error);
      throw error;
    }
  }

  // Get Event Registration
  static async getEventRegistration(registrationId: string) {
    try {
      const { data, error } = await supabase
        .from('event_users')
        .select(`
          *,
          event_children (*)
        `)
        .eq('registration_id', registrationId)
        .single();

      if (error) {
        throw new Error(`Event registration not found: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching event registration:', error);
      throw error;
    }
  }

  // Get Admission Registration
  static async getAdmissionRegistration(registrationId: string) {
    try {
      const { data, error } = await supabase
        .from('admission_users')
        .select(`
          *,
          admission_children (*)
        `)
        .eq('registration_id', registrationId)
        .single();

      if (error) {
        throw new Error(`Admission registration not found: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching admission registration:', error);
      throw error;
    }
  }

  // Get all registrations (for admin purposes)
  static async getAllEventRegistrations() {
    try {
      const { data, error } = await supabase
        .from('event_users')
        .select(`
          *,
          event_children (*)
        `)
        .order('created_at', { ascending: false }); 

      if (error) {
        throw new Error(`Failed to fetch event registrations: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching all event registrations:', error);
      throw error;
    }
  }

  static async getAllAdmissionRegistrations() {
    try {
      const { data, error } = await supabase
        .from('admission_users')
        .select(`
          *,
          admission_children (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch admission registrations: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching all admission registrations:', error);
      throw error;
    }
  }
}
