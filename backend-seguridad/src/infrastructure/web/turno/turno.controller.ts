import { Request, Response } from 'express';
import { CreateTurno } from '../../../application/use-cases/turno/create-turno';
import { GetTurno } from '../../../application/use-cases/turno/get-turno';
import { GetAllTurnos } from '../../../application/use-cases/turno/get-all-turnos';
import { UpdateTurno } from '../../../application/use-cases/turno/update-turno';
import { DeleteTurno } from '../../../application/use-cases/turno/delete-turno';
import { Turno } from '../../../domain/turno/turno';

export class TurnoController {
    constructor(
        private readonly createTurno: CreateTurno,
        private readonly getTurno: GetTurno,
        private readonly getAllTurnos: GetAllTurnos,
        private readonly updateTurno: UpdateTurno,
        private readonly deleteTurno: DeleteTurno
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const turno = await this.createTurno.execute(req.body as Turno);
            res.status(201).json(turno);
        } catch (error) {
            res.status(500).json({ message: 'Error creating turno' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const turno = await this.getTurno.execute(+req.params.id);
            if (turno) {
                res.status(200).json(turno);
            } else {
                res.status(404).json({ message: 'Turno not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding turno' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const turnos = await this.getAllTurnos.execute();
            res.status(200).json(turnos);
        } catch (error) {
            res.status(500).json({ message: 'Error finding turnos' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const turno = await this.updateTurno.execute(+req.params.id, req.body as Partial<Turno>);
            if (turno) {
                res.status(200).json(turno);
            } else {
                res.status(404).json({ message: 'Turno not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating turno' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteTurno.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Turno not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting turno' });
        }
    }
}
