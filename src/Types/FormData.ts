export interface FormDataI {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  companyName: string;
  companyCreationDate: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  companyPhone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Input {
  name: string;
  value: string;
  id: number;
  type: string;
  placeholder: string;
}
