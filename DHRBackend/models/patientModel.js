// Patient Model
// Represents patient information in the system

export const patientSchema = {
  tableName: 'patients',
  fields: {
    id: 'uuid',
    health_id: 'text', // ABHA Health ID
    aadhaar: 'text',
    name: 'text',
    age: 'integer',
    gender: 'text',
    date_of_birth: 'date',
    phone: 'text',
    email: 'text',
    
    // Location details
    origin_state: 'text',
    origin_city: 'text',
    current_state: 'text',
    current_city: 'text',
    current_address: 'text',
    workplace: 'text',
    
    // Additional info
    avatar_url: 'text',
    blood_group: 'text',
    emergency_contact_name: 'text',
    emergency_contact_phone: 'text',
    
    // Status
    is_verified: 'boolean',
    verification_date: 'timestamp',
    
    // Timestamps
    created_at: 'timestamp',
    updated_at: 'timestamp'
  }
};

// Helper functions for patient operations
export const PatientModel = {
  /**
   * Get patient by ID
   * @param {Object} supabase - Supabase client
   * @param {string} patientId - Patient ID
   * @returns {Promise<Object>} Patient data
   */
  async getById(supabase, patientId) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();
    
    if (error) throw error;
    return data;
  },

  

  /**
   * Get patient by health ID
   * @param {Object} supabase - Supabase client
   * @param {string} health_id - ABHA Health ID
   * @returns {Promise<Object>} Patient data
   */
  async getByHealthId(supabase, health_id) {
    const { data, error } = await supabase
      .from('patients')
      .select('*, medical_records(*)')
      .eq('health_id', health_id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update patient information
   * @param {Object} supabase - Supabase client
   * @param {string} patientId - Patient ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated patient data
   */
  async update(supabase, patientId, updates) {
    const { data, error } = await supabase
      .from('patients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', patientId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Create new patient
   * @param {Object} supabase - Supabase client
   * @param {Object} patientData - Patient information
   * @returns {Promise<Object>} Created patient data
   */
  async create(supabase, patientData) {
    const { data, error } = await supabase
      .from('patients')
      .insert([{
        ...patientData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export default PatientModel;
