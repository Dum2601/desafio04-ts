export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(database = db) {
        this.db = database
    }

    createUser = (name: string, email: string) => {
        if (!email || email.trim() === "") {
            throw new Error("Email é obrigatório")
        }

        const user = { name, email }
        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }
}
