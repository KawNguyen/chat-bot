export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface Type {
  id: string;
  name: string;
  slug: string;
}

export interface Headphone {
  id: string;
  name: string;
  slug: string;
  price: number;
  brand: Brand;
  type: Type;
  brand_id: string;
  type_id: string;
}

export type DialogState<T> = {
  open: boolean;
  mode: "create" | "edit";
  data?: T;
};
