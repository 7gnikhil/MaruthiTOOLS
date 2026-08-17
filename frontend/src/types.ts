export type Page = 
  | 'Home'
  | 'Products'
  | 'Moulds'
  | 'Machinery'
  | 'End Components'
  | 'Services'
  | 'About Us'
  | 'Contact Us'
  | 'Careers';

// Product category: 'Mould' | 'CNC' | 'EDM' | 'End Component'
export type ProductCategory = 'Mould' | 'CNC' | 'EDM' | 'End Component';

export interface MouldSpecs {
  cavitation?: string;
  steelGrade?: string;
  runnerType?: string;
  ejectionSystem?: string;
  moldLife?: string;
  tolerance?: string;
  leadTime?: string;
  applications?: string[];
  features?: string[];
}

export interface Product {
  _id?: string;
  name: string;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  gallery?: string[];
  updatedAt: Date;
  specs?: MouldSpecs;
}

export interface CareerPost {
  _id?: string;
  position: string;
  description: string;
  location: string;
}

export interface Update {
    _id?: string;
    title: string;
    description: string;
    date: string;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon: string;
}

export interface Inquiry {
  _id?: string;
  name?: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: Date;
}
