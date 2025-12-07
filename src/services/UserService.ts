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
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (email: string) => {
        if (!email || email.trim() === "") {
            throw new Error("Email é obrigatório para deletar")
        }

        const index = this.db.findIndex(user => user.email === email)

        if (index === -1) {
            throw new Error("Usuário não encontrado")
        }

        this.db.splice(index, 1)
        return true
    }
}
