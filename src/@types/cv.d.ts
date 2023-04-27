interface ICv {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  gender: boolean;
  certifications: ICertifications[];
  objective: string;
  skills: string[];
  experince: IExperince[];
  projects: IProject[];
  avatar: any;
}

interface ICertifications {
  time: string;
  name: string;
}

interface IExperince {
  position: string;
  companyName: string;
  description: string;
  fromto: string[];
}

interface IProject {
  position: string;
  projectName: string;
  customer: string;
  teamSize: number;
  fromto: string[];
  technology: string[];
}
