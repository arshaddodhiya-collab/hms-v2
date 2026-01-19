export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus?: string;
}

export interface ContactInfo {
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface MedicalInfo {
  bloodGroup: string;
  allergies: string[]; // Dynamic
  currentMedications: string[]; // Dynamic
  pastSurgeries: string[]; // Dynamic
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface InsuranceInfo {
  providerName: string;
  policyNumber: string;
  coverageDetails: string;
  expirationDate: string;
}

export interface PatientRegistration {
  personalDetails: PersonalDetails;
  contactInfo: ContactInfo;
  medicalInfo: MedicalInfo;
  emergencyContacts: EmergencyContact[]; // Dynamic Array
  insuranceInfo: InsuranceInfo;
}
