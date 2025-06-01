export interface JobOffer {
  id?: number; // Optional ID for existing offers
  name: string;
  companyId: number;
  email: string;
  phone: number | null;
  date: Date | null;
  city: string;
  modality: string;
  salary: number | null;
  description: string;
  status: 'Abierta' | 'Cerrada' | string;
}
