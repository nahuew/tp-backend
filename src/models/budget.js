const STATUS = ["waiting","approved","rejected" ] 

class budget {
    constructor(name, location, amount, status, startDate, estimateEndDate, description = '') {
        this.id                 = Date.now()
        this.name               = name
        this.location           = location
        this.amount             = amount
        this.status             = STATUS.includes(status) ? status : "waiting"
        this.startDate          = startDate         || null
        this.estimatedEndDate   = estimateEndDate   || null
        this.description        = description
    }
}