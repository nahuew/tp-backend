const ESTADOS = ["planificacion", "en_ejecucion", "pausada", "finalizada"] 

class Obra {
    constructor(nombre, ubicacion, director, estado, fecha_inicio, fecha_fin_estimada) {
        this.id                 = Date.now()
        this.nombre             = nombre
        this.ubicacion          = ubicacion
        this.director           = director
        this.estado             = ESTADOS.includes(estado) ? estado : "planificacion"
        this.fecha_inicio       = fecha_inicio       || null
        this.fecha_fin_estimada = fecha_fin_estimada || null
    }
}
