import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class CreateUsuario {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.create(usuario);
    }
}
