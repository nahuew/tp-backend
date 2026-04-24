const STATUS = ["planning", "running", "stop", "conclude"] 

class Job {
    constructor(name, location, director, status, startDate, estimateEndDate) {
        this.id                 = Date.now()
        this.name               = name
        this.location           = location
        this.director           = director
        this.status             = STATUS.includes(status) ? status : "planning"
        this.startDate          = startDate         || null
        this.estimateEndDate    = estimateEndDate   || null
    }
}

module.exports = Job;