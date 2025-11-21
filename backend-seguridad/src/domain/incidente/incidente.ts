export interface Incidente {
    id_incidente: number;
    id_usuario_reporta: number | null;
    id_tipo_incidente: number;
    descripcion: string;
    latitud: number;
    longitud: number;
    fecha_hora_reporte: Date;
    estado_validacion: 'Pendiente' | 'Validado';
    estado_sincronizacion: 'Sincronizado' | 'Pendiente';
}
