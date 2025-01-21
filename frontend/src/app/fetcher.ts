import axiosInstance from "@/utils/auth-axios";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  is_active: number;
  role: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface UniversitiesIndexResponse {
  success: boolean;
  data: Universities[];
}

export interface UniversitiesByIDResponse {
  success: boolean;
  data: UniversityByID;
}

export interface UniversityByID {
  id: string;
  name: string;
  overview: string;
  tel: string;
  email: string;
  website: string;
  address: string;
  accreditation: string;
  category: string;
  faculty: string;
  degree: string;
  faculty_data: FacultyDatum[];
  degree_data: DegreeDatum[];
  cost: Cost;
}

export interface Cost {
  id: string;
  universities_id: string;
  registration_cost: number;
  time_minutes: number;
}

export interface DegreeDatum {
  id: string;
  degree_name: string;
  is_enabled: number;
}

export interface FacultyDatum {
  id: string;
  faculty_name: string;
  is_enabled: number;
}

export interface Universities {
  id: string;
  name: string;
  overview: string;
  tel: string;
  email: string;
  website: string;
  address: string;
  accreditation: string;
  category: string;
  faculty: string;
  degree: string;
  cost: Cost;
}

export interface Cost {
  id: string;
  universities_id: string;
  registration_cost: number;
  time_minutes: number;
}

export interface DegreesIndexResponse {
  success: boolean;
  data: Degrees[];
}

export interface DegreesByIdResponse {
  success: boolean;
  data: Degrees;
}

export interface FacultiesIndexResponse {
  success: boolean;
  data: Faculties[];
}

export interface FacultiesByIDResponse {
  success: boolean;
  data: Faculties;
}

export interface Faculties {
  id: string;
  faculty_name: string;
  is_enabled: number;
}

export interface Degrees {
  id: string;
  degree_name: string;
  is_enabled: number;
}

export interface PersonalAcceptanceResponse {
  success: boolean;
  data: Acceptance[];
}

export interface Acceptance {
  id: string;
  user_id: number;
  universities_id: string;
  status: string;
}

export interface IndexAcceptanceResponse {
  success: boolean;
  data: AcceptanceIndex[];
}

export interface AcceptanceIndex {
  id: string;
  user_id: number;
  universities_id: string;
  status: string;
  universities: Universities;
  user: User;
}

export interface Universities {
  id: string;
  name: string;
  overview: string;
  tel: string;
  email: string;
  website: string;
  address: string;
  accreditation: string;
  category: string;
  faculty: string;
  degree: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: number;
  role: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface CheckAlreadyAppliedResponse {
  success: boolean;
  payload: boolean;
}

export interface UserIndexListResponse {
  success: boolean;
  users: User[];
}

export interface UserSearchResponse {
  success: boolean;
  data: User[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: number;
  role: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}

export const getUser = async (): Promise<UserResponse | null> => {
  const res = await axiosInstance.get("/api/check");
  return res.data;
};

export const getUniversities =
  async (): Promise<UniversitiesIndexResponse | null> => {
    const res = await axiosInstance.get("/api/universities/index");
    return res.data;
  };

export const searchUniversities = async (
  query: string
): Promise<UniversitiesIndexResponse | null> => {
  const res = await axiosInstance.get(`/api/universities/search/${query}`);
  return res.data;
};

export const getDegrees = async (): Promise<DegreesIndexResponse | null> => {
  const res = await axiosInstance.get(`/api/degrees/index`);
  return res.data;
};

export const getDegreeById = async (
  id: string
): Promise<DegreesByIdResponse | null> => {
  const res = await axiosInstance.get(`/api/degrees/get/${id}`);
  return res.data;
};

export const getFaculties =
  async (): Promise<FacultiesIndexResponse | null> => {
    const res = await axiosInstance.get(`/api/faculty/index`);
    return res.data;
  };

export const getFacultyById = async (
  id: string
): Promise<FacultiesByIDResponse | null> => {
  const res = await axiosInstance.get(`/api/faculty/get/${id}`);
  return res.data;
};

export const handleFacultyList = async (
  id: string
): Promise<FacultiesByIDResponse | null | boolean | undefined> => {
  try {
    const res = await axiosInstance.get(`/api/faculty/get/${id}`);
    return res.data;
  } catch {
    return false;
  }
};

export const handleDegreeList = async (
  id: string
): Promise<DegreesByIdResponse | null | boolean | undefined> => {
  try {
    const res = await axiosInstance.get(`/api/degrees/get/${id}`);
    return res.data;
  } catch {
    return false;
  }
};

export const getUniversityById = async (
  id: string
): Promise<UniversitiesByIDResponse | null> => {
  const res = await axiosInstance.get(`/api/universities/get/${id}`);
  return res.data;
};

export const checkIfAlreadyApplied = async (
  id: string
): Promise<CheckAlreadyAppliedResponse | null> => {
  const res = await axiosInstance.get(`/api/universities/check-done/${id}`);
  return res.data;
};

export const getPersonalMemberAcceptances =
  async (): Promise<PersonalAcceptanceResponse | null> => {
    const res = await axiosInstance.get(`/api/apply/list`);
    return res.data;
  };

export const getAllMemberAcceptances =
  async (): Promise<IndexAcceptanceResponse | null> => {
    const res = await axiosInstance.get(`/api/acceptance/index`);
    return res.data;
  };

export const getAllUsers = async (): Promise<UserIndexListResponse | null> => {
  const res = await axiosInstance.get(`/api/users/index`);
  return res.data;
};

export const searchUsers = async (
  query: string
): Promise<UserSearchResponse | null> => {
  const res = await axiosInstance.get(`/api/users/search/${query}`);
  return res.data;
};
