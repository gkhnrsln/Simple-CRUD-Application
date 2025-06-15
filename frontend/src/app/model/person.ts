export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  mail?: string;
  phone?: string;
  address?: {
    street: string;
    zip: number;
    city: string;
  };
  profession?: string;
}
