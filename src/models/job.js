const STATUS = ["Planning", "running", "stop", "conclude"] 

class Obra {
    constructor(name, location, director, status, startDate, estimateEndDate) {
        this.id                 = Date.now()
        this.name               = name
        this.location           = location
        this.director           = director
        this.status             = STATUS.includes(status) ? status : "Planning"
        this.startDate          = startDate         || null
        this.estimateEndDate    = estimateEndDate   || null
    }

    // Método para obtener la obra en formato JSON
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            director: this.director,
            status: this.status,
            startDate: this.startDate,
            estimateEndDate: this.estimateEndDate
        }
    }
}
