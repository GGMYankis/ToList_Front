interface Comment {
    comentario: string;
}

interface ITask {
    TaskId: number;
    Titulo: string;
    Descripcion: string;
    Estado: string;
    FechaCreacion: string;
    FechaVencimiento: string;
    color: string | null;
    NombreEquipo: string;
    NombreUsuario: string;
    id_estado: number;
    Comentarios: Comment[] | null;
}

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}