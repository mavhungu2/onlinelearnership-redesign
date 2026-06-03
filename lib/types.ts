export type OpportunityType =
  | "learnership"
  | "internship"
  | "bursary"
  | "graduate"
  | "apprenticeship"
  | "government";

export type Qualification =
  | "Grade 10"
  | "Grade 11"
  | "Grade 12 / Matric"
  | "Certificate"
  | "Diploma"
  | "Degree"
  | "Postgraduate";

export type SAProvince =
  | "Gauteng"
  | "Western Cape"
  | "KwaZulu-Natal"
  | "Eastern Cape"
  | "Free State"
  | "Limpopo"
  | "Mpumalanga"
  | "North West"
  | "Northern Cape"
  | "Nationwide";

export interface Opportunity {
  slug: string;
  title: string;
  organisation: string;
  organisationLogo?: string;
  image?: string; // Featured image URL
  imageAlt?: string;
  type: OpportunityType;
  category: string;
  location: SAProvince;
  stipend?: string;
  duration?: string;
  closingDate: string; // ISO
  postedDate: string; // ISO
  minQualification: Qualification;
  description: string;
  requirements: string[];
  responsibilities: string[];
  howToApply: string[];
  applyUrl?: string;
  featured?: boolean;
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  count: number;
  accent: "brand" | "accent" | "warm" | "purple" | "rose" | "sky";
}
