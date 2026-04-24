const STATUS = ["waiting","approved","rejected" ] 

class Budget {
    constructor(name, location, amount, status, startDate, estimateEndDate, job_id, description = '') {
        this.id                 = Date.now()
        this.name               = name
        this.location           = location
        this.amount             = amount
        this.status             = STATUS.includes(status) ? status : "waiting"
        this.startDate          = startDate         || null
        this.estimatedEndDate   = estimateEndDate   || null
        this.job_id             = job_id
        this.description        = description
    }
}

module.exports = Budget;