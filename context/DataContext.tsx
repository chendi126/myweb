import React, { createContext, useState, useEffect, useContext } from 'react';
import { Experience, Project, SectionId, SocialLink } from '../types';

export interface HeroData {
  status: string;
  titlePrefix: string;
  titleSuffix: string;
  description: string;
  buttonText: string;
  resumeText: string;
}

export interface AboutData {
  titlePrefix: string;
  titleHighlight: string;
  description1: string;
  description2: string;
  stats: { value: string; label: string }[];
  imageUrl: string;
}

export interface NavbarData {
  brandPrefix: string;
  brandSuffix: string;
  navLinks: { id: SectionId; label: string }[];
  contactButtonText: string;
}

export interface ContactData {
  titlePrefix: string;
  titleHighlight: string;
  message: string;
  emailAddress: string;
  emailText: string;
  footerLeft: string;
  footerRight: string;
}

export interface SiteData {
  hero: HeroData;
  about: AboutData;
  navbar: NavbarData;
  contact: ContactData;
  projects: Project[];
  experiences: Experience[];
  socialLinks: SocialLink[];
}

interface DataContextType {
  data: SiteData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateData: (newData: SiteData) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = 'http://localhost:3002/api';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/data`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load site data. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async (newData: SiteData) => {
    try {
      const response = await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      setData(newData);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json();
    return `http://localhost:3002${result.url}`;
  };

  return (
    <DataContext.Provider value={{ data, loading, error, refreshData: fetchData, updateData, uploadImage }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
