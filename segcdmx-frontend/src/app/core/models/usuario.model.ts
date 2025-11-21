export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
  certificaciones?: string[];
}

