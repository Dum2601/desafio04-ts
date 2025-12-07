import { UserService } from "./UserService"

describe("UserService", () => {

    it("deve criar usuário quando email for válido", () => {
        const service = new UserService([])

        service.createUser("Maria", "maria@teste.com")

        const users = service.getAllUsers()
        expect(users.length).toBe(1)
        expect(users[0].email).toBe("maria@teste.com")
    })

    it("deve lançar erro quando email não for informado", () => {
        const service = new UserService([])

        expect(() => {
            service.createUser("Carlos", "")
        }).toThrow("Email é obrigatório")

        expect(() => {
            service.createUser("Carlos", undefined as any)
        }).toThrow("Email é obrigatório")
    })

    it("deve deletar um usuário existente", () => {
        const service = new UserService([
            { name: "Joana", email: "joana@dio.com" },
            { name: "Carlos", email: "carlos@dio.com" }
        ])

        service.deleteUser("carlos@dio.com")

        const users = service.getAllUsers()
        expect(users.length).toBe(1)
        expect(users[0].email).toBe("joana@dio.com")
    })

    it("deve lançar erro ao tentar deletar usuário inexistente", () => {
        const service = new UserService([
            { name: "Joana", email: "joana@dio.com" },
        ])

        expect(() => {
            service.deleteUser("inexistente@dio.com")
        }).toThrow("Usuário não encontrado")
    })

    it("deve lançar erro ao tentar deletar com email vazio", () => {
        const service = new UserService([])

        expect(() => {
            service.deleteUser("")
        }).toThrow("Email é obrigatório para deletar")
    })
})
