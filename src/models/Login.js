class Login {
    constructor(username, password = "default_password", roles = ["user"]) {
        this.name = username;
        this.password = password;
        this.roles = roles;
    }
}

module.exports = Login;
