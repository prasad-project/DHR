import supabase from "../services/supabaseClient.js";
import PatientModel from "../models/patientModel.js";

/**
 * Patient Controller
 * Handles patient profile and medical history operations
 */

/**
 * Get patient by ID
 * GET /api/patient/:patientId
 */
export const getPatientById = async (req, res) => {
    try {
        const { patientId } = req.params;

        const patient = await PatientModel.getById(supabase, patientId);

        if (!patient) {
            return res.status(404).json({
                error: "Patient not found"
            });
        }

        res.json({
            success: true,
            patient: patient
        });

    } catch (error) {
        console.error("Get patient error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get patient by Health ID
 *  /api/patient/health-id
 */
export const getPatientByHealthId = async (req, res) => {
    try {
        const { healthId} = req.params;

        const patient = await PatientModel.getByHealthId(supabase, healthId);

        if (!patient) {
            return res.status(404).json({
                error: "Patient not found"
            });
        }

        res.json({
            success: true,
            patient: patient
        });

    } catch (error) {
        console.error("Get patient by health ID error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get patient medical history
 * GET /api/patient/:patientId/history
 */
export const getPatientHistory = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Get patient details
        const patient = await PatientModel.getById(supabase, patientId);

        if (!patient) {
            return res.status(404).json({
                error: "Patient not found"
            });
        }

        // Get medical records
        const { data: medicalRecords, error: recordsError } = await supabase
            .from('medical_records')
            .select(`
        *,
        doctor:doctors(name, specialization, hospital_name)
      `)
            .eq('patient_id', patientId)
            .order('visit_date', { ascending: false });

        // Get prescriptions
        const { data: prescriptions, error: prescriptionsError } = await supabase
            .from('prescriptions')
            .select(`
        *,
        doctor:doctors(name, specialization)
      `)
            .eq('patient_id', patientId)
            .order('prescribed_date', { ascending: false })
            .limit(20);

        // Get vitals history
        const { data: vitals, error: vitalsError } = await supabase
            .from('vitals')
            .select('*')
            .eq('patient_id', patientId)
            .order('recorded_at', { ascending: false })
            .limit(10);

        // Get appointments
        const { data: appointments, error: appointmentsError } = await supabase
            .from('appointments')
            .select(`
        *,
        doctor:doctors(name, specialization)
      `)
            .eq('patient_id', patientId)
            .order('appointment_date', { ascending: false })
            .limit(10);

        if (recordsError || prescriptionsError || vitalsError || appointmentsError) {
            throw new Error("Error fetching patient history");
        }

        res.json({
            success: true,
            patient: patient,
            history: {
                medical_records: medicalRecords || [],
                prescriptions: prescriptions || [],
                vitals: vitals || [],
                appointments: appointments || []
            }
        });

    } catch (error) {
        console.error("Get patient history error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Update patient information
 * PUT /api/patient/:patientId
 * Body: { name, phone, email, etc. }
 */
export const updatePatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const updates = req.body;

        // Don't allow updating certain fields
        delete updates.id;
        delete updates.health_id;
        delete updates.aadhaar;
        delete updates.is_verified;
        delete updates.created_at;

        const updatedPatient = await PatientModel.update(supabase, patientId, updates);

        res.json({
            success: true,
            message: "Patient information updated successfully",
            patient: updatedPatient
        });

    } catch (error) {
        console.error("Update patient error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get patient summary statistics
 * GET /api/patient/:patientId/stats
 */
export const getPatientStats = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Get total visits
        const { count: visitsCount, error: visitsError } = await supabase
            .from('medical_records')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', patientId);

        // Get total prescriptions
        const { count: prescriptionsCount, error: prescriptionsError } = await supabase
            .from('prescriptions')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', patientId);

        // Get missed appointments
        const { count: missedCount, error: missedError } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .eq('patient_id', patientId)
            .eq('status', 'no-show');

        // Get next appointment
        const now = new Date().toISOString();
        const { data: nextAppointment, error: nextError } = await supabase
            .from('appointments')
            .select(`
        *,
        doctor:doctors(name, specialization)
      `)
            .eq('patient_id', patientId)
            .eq('status', 'scheduled')
            .gte('appointment_date', now)
            .order('appointment_date', { ascending: true })
            .limit(1)
            .single();

        if (visitsError || prescriptionsError || missedError) {
            throw new Error("Error fetching patient statistics");
        }

        res.json({
            success: true,
            stats: {
                total_visits: visitsCount || 0,
                total_prescriptions: prescriptionsCount || 0,
                missed_appointments: missedCount || 0,
                next_appointment: nextAppointment || null
            }
        });

    } catch (error) {
        console.error("Get patient stats error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};


export const getHealthCard = async (req,res)=>{
   try {
     const {healthId}=req.body;

    const healthCard=await supabase
    .from('patients')
    .select('*')
    .eq('health_id',healthId)
    .single();

    return res.json({
        success:true,
        healthCard
    })
   } catch (error) {
    console.error("database error",error);
    res.json({error})
   }
}
