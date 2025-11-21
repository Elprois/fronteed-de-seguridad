import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';

export interface RegistroAsistenciaRepository {
    create(registroAsistencia: RegistroAsistencia): Promise<RegistroAsistencia>;
    findById(id: number): Promise<RegistroAsistencia | null>;
    findAll(): Promise<RegistroAsistencia[]>;
    update(id: number, registroAsistencia: Partial<RegistroAsistencia>): Promise<RegistroAsistencia | null>;
    delete(id: number): Promise<boolean>;
}
