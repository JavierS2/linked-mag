export interface JobOffer {
  name: string;
  companyId: number;
  email: string;
  phone: number | null;
  date: Date | null;
  city: string;
  modality: string;
  salary: number | null;
  description: string;
}
