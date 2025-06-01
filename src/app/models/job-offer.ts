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

  // NO DEBE IR EN EL BACKEND, SOLO SE CREA PARA HACER UN MEJOR MANEJO DE LOS DATE
  fechaPublicacion ?: Date;// <-- AÑADE ESTA LÍNEA
}
