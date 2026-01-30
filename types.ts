export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export enum SectionId {
  HERO = 'hero',
  WORK = 'work',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  CONTACT = 'contact',
}