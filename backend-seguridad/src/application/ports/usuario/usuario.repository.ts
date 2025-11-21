import { Usuario } from '../../../domain/usuario/usuario';

export interface UsuarioRepository {
    create(usuario: Usuario): Promise<Usuario>;
    findById(id: number): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
    update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null>;
    delete(id: number): Promise<boolean>;
}
