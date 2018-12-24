export class Todo {
    id: number;
    texto: string;
    completado: boolean;

    constructor(texto: string) {
        this.texto = texto.charAt(0).toUpperCase() + texto.slice(1);
        this.completado = false;
        this.id = Math.random();
    }
}
