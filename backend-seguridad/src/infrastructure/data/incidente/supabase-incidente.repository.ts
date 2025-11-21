import { Incidente } from '../../../domain/incidente/incidente';
import { IncidenteRepository } from '../../../application/ports/incidente/incidente.repository';
import { supabase } from '../supabase';

export class SupabaseIncidenteRepository implements IncidenteRepository {
    async create(incidente: Incidente): Promise<Incidente> {
        const { data, error } = await supabase
            .from('Incidentes')
            .insert([incidente])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as Incidente;
    }

    async findById(id: number): Promise<Incidente | null> {
        const { data, error } = await supabase
            .from('Incidentes')
            .select('*')
            .eq('id_incidente', id)
            .single();
        if (error) {
            return null;
        }
        return data as Incidente;
    }

    async findAll(): Promise<Incidente[]> {
        const { data, error } = await supabase
            .from('Incidentes')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as Incidente[];
    }

    async update(id: number, incidente: Partial<Incidente>): Promise<Incidente | null> {
        const { data, error } = await supabase
            .from('Incidentes')
            .update(incidente)
            .eq('id_incidente', id)
            .single();
        if (error) {
            return null;
        }
        return data as Incidente;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('Incidentes')
            .delete()
            .eq('id_incidente', id);
        return !error;
    }
}
