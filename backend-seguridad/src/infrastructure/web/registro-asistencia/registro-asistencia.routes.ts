import { Router } from 'express';
import { RegistroAsistenciaController } from './registro-asistencia.controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroAsistencia:
 *       type: object
 *       required:
 *         - id_registro
 *         - id_turno
 *         - id_usuario
 *         - check_in_time
 *       properties:
 *         id_registro:
 *           type: number
 *           description: The auto-generated id of the registro asistencia
 *         id_turno:
 *           type: number
 *           description: The id of the turno
 *         id_usuario:
 *           type: number
 *           description: The id of the usuario
 *         check_in_time:
 *           type: string
 *           format: date-time
 *           description: The check-in time
 *         check_out_time:
 *           type: string
 *           format: date-time
 *           description: The check-out time
 *       example:
 *         id_registro: 1
 *         id_turno: 1
 *         id_usuario: 1
 *         check_in_time: "2025-11-20T09:00:00.000Z"
 *         check_out_time: "2025-11-20T17:00:00.000Z"
 */

export const registroAsistenciaRouter = (controller: RegistroAsistenciaController) => {
    const router = Router();

    /**
     * @swagger
     * /registros-asistencia:
     *   post:
     *     summary: Create a new registro asistencia
     *     tags: [RegistrosAsistencia]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegistroAsistencia'
     *     responses:
     *       201:
     *         description: The registro asistencia was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       500:
     *         description: Some server error
     */
    router.post('/', (req, res) => controller.create(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *   get:
     *     summary: Get the registro asistencia by id
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The registro asistencia id
     *     responses:
     *       200:
     *         description: The registro asistencia description by id
     *         contens:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/RegistroAsistencia'
     *       404:
     *         description: The registro asistencia was not found
     */
    router.get('/:id', (req, res) => controller.findById(req, res));

    /**
     * @swagger
     * /registros-asistencia:
     *   get:
     *     summary: Returns the list of all the registros asistencia
     *     tags: [RegistrosAsistencia]
     *     responses:
     *       200:
     *         description: The list of the registros asistencia
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/RegistroAsistencia'
     */
    router.get('/', (req, res) => controller.findAll(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *  put:
     *    summary: Update the registro asistencia by the id
     *    tags: [RegistrosAsistencia]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The registro asistencia id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/RegistroAsistencia'
     *    responses:
     *      200:
     *        description: The registro asistencia was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/RegistroAsistencia'
     *      404:
     *        description: The registro asistencia was not found
     *      500:
     *        description: Some error happened
     */
    router.put('/:id', (req, res) => controller.update(req, res));

    /**
     * @swagger
     * /registros-asistencia/{id}:
     *   delete:
     *     summary: Remove the registro asistencia by id
     *     tags: [RegistrosAsistencia]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The registro asistencia id
     *
     *     responses:
     *       204:
     *         description: The registro asistencia was deleted
     *       404:
     *         description: The registro asistencia was not found
     */
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
