import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../../application/ports/usuario/usuario.repository';
import { supabase } from '../supabase';

export class SupabaseUsuarioRepository implements UsuarioRepository {
    async create(usuario: Usuario): Promise<Usuario> {
        const { data, error } = await supabase
            .from('Usuarios')
            .insert([usuario])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as Usuario;
    }

    async findById(id: number): Promise<Usuario | null> {
        const { data, error } = await supabase
            .from('Usuarios')
            .select('*')
            .eq('id_usuario', id)
            .single();
        if (error) {
            return null;
        }
        return data as Usuario;
    }

    async findAll(): Promise<Usuario[]> {
        const { data, error } = await supabase
            .from('Usuarios')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as Usuario[];
    }

    async update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
        const { data, error } = await supabase
            .from('Usuarios')
            .update(usuario)
            .eq('id_usuario', id)
            .single();
        if (error) {
            return null;
        }
        return data as Usuario;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('Usuarios')
            .delete()
            .eq('id_usuario', id);
        return !error;
    }
}
