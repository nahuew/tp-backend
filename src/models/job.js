const STATUS = ["Planning", "running", "stop", "conclude"] 

class job {
    constructor(name, location, director, status, startDate, estimateEndDate) {
        this.id                 = Date.now()
        this.name               = name
        this.location           = location
        this.director           = director
        this.status             = STATUS.includes(status) ? status : "Planning"
        this.startDate          = startDate         || null
        this.estimateEndDate    = estimateEndDate   || null
    }
}
