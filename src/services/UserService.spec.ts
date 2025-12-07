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
})
