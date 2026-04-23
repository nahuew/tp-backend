const STATUS = ["Planning", "running", "stop", "conclude"] 

class Obra {
    constructor(name, location, amount, status, startDate, estimateEndDate) {
        this.id                 = Date.now()
        this.name               = name
        this.location           = location
        this.amount             = amount
        this.status             = STATUS.includes(status) ? status : "Planning"
        this.startDate          = startDate         || null
        this.estimatedEndDate   = estimatedEndDate  || null
    }
}