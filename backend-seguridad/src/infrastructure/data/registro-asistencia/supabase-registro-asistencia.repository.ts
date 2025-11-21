import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../../application/ports/registro-asistencia/registro-asistencia.repository';
import { supabase } from '../supabase';

export class SupabaseRegistroAsistenciaRepository implements RegistroAsistenciaRepository {
    async create(registroAsistencia: RegistroAsistencia): Promise<RegistroAsistencia> {
        const { data, error } = await supabase
            .from('Registros_Asistencia')
            .insert([registroAsistencia])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as RegistroAsistencia;
    }

    async findById(id: number): Promise<RegistroAsistencia | null> {
        const { data, error } = await supabase
            .from('Registros_Asistencia')
            .select('*')
            .eq('id_registro', id)
            .single();
        if (error) {
            return null;
        }
        return data as RegistroAsistencia;
    }

    async findAll(): Promise<RegistroAsistencia[]> {
        const { data, error } = await supabase
            .from('Registros_Asistencia')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as RegistroAsistencia[];
    }

    async update(id: number, registroAsistencia: Partial<RegistroAsistencia>): Promise<RegistroAsistencia | null> {
        const { data, error } = await supabase
            .from('Registros_Asistencia')
            .update(registroAsistencia)
            .eq('id_registro', id)
            .single();
        if (error) {
            return null;
        }
        return data as RegistroAsistencia;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('Registros_Asistencia')
            .delete()
            .eq('id_registro', id);
        return !error;
    }
}
