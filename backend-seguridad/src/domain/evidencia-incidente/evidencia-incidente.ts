export interface EvidenciaIncidente {
    id_evidencia: number;
    id_incidente: number;
    tipo_archivo: 'Imagen' | 'Video';
    url_archivo: string;
}
