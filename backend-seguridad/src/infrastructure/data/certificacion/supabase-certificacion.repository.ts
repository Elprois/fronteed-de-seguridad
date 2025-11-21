import { Certificacion } from '../../../domain/certificacion/certificacion';
import { CertificacionRepository } from '../../../application/ports/certificacion/certificacion.repository';
import { supabase } from '../supabase';

export class SupabaseCertificacionRepository implements CertificacionRepository {
    async create(certificacion: Certificacion): Promise<Certificacion> {
        const { data, error } = await supabase
            .from('Certificaciones')
            .insert([certificacion])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as Certificacion;
    }

    async findById(id: number): Promise<Certificacion | null> {
        const { data, error } = await supabase
            .from('Certificaciones')
            .select('*')
            .eq('id_certificacion', id)
            .single();
        if (error) {
            return null;
        }
        return data as Certificacion;
    }

    async findAll(): Promise<Certificacion[]> {
        const { data, error } = await supabase
            .from('Certificaciones')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as Certificacion[];
    }

    async update(id: number, certificacion: Partial<Certificacion>): Promise<Certificacion | null> {
        const { data, error } = await supabase
            .from('Certificaciones')
            .update(certificacion)
            .eq('id_certificacion', id)
            .single();
        if (error) {
            return null;
        }
        return data as Certificacion;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('Certificaciones')
            .delete()
            .eq('id_certificacion', id);
        return !error;
    }
}
