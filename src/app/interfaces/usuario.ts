export interface Usario {
  $key?: string;
  name: string;
  lastName: string;
  id: number;
  rol: Rol;
  state: State;
  password: any;
  number: number;
  email: string;
}

export enum Rol{
  administrador = 1,
  coordinador =2,
  digitador = 3,
  conductor = 4,
  recolector =5,
}

export enum State{
  activo = 'Activo',
  inactivo = 'Inactivo',
}
