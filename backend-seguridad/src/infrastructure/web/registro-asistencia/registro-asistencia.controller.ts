import { Request, Response } from 'express';
import { CreateRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/create-registro-asistencia';
import { GetRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/get-registro-asistencia';
import { GetAllRegistrosAsistencia } from '../../../application/use-cases/registro-asistencia/get-all-registros-asistencia';
import { UpdateRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/update-registro-asistencia';
import { DeleteRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/delete-registro-asistencia';
import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';

export class RegistroAsistenciaController {
    constructor(
        private readonly createRegistroAsistencia: CreateRegistroAsistencia,
        private readonly getRegistroAsistencia: GetRegistroAsistencia,
        private readonly getAllRegistrosAsistencia: GetAllRegistrosAsistencia,
        private readonly updateRegistroAsistencia: UpdateRegistroAsistencia,
        private readonly deleteRegistroAsistencia: DeleteRegistroAsistencia
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.createRegistroAsistencia.execute(req.body as RegistroAsistencia);
            res.status(201).json(registroAsistencia);
        } catch (error) {
            res.status(500).json({ message: 'Error creating registro asistencia' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.getRegistroAsistencia.execute(+req.params.id);
            if (registroAsistencia) {
                res.status(200).json(registroAsistencia);
            } else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding registro asistencia' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const registrosAsistencia = await this.getAllRegistrosAsistencia.execute();
            res.status(200).json(registrosAsistencia);
        } catch (error) {
            res.status(500).json({ message: 'Error finding registros asistencia' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.updateRegistroAsistencia.execute(+req.params.id, req.body as Partial<RegistroAsistencia>);
            if (registroAsistencia) {
                res.status(200).json(registroAsistencia);
            } else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating registro asistencia' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteRegistroAsistencia.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting registro asistencia' });
        }
    }
}
