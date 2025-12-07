import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([
            { name: "Nath", email: "nath@test.com" }
        ])
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
        expect(mockUserService.createUser).toHaveBeenCalledWith('Nath', 'nath@test.com')
    })

    it('Deve retornar erro caso o name não seja informado', () => {
        const mockRequest = {
            body: {
                email: 'test@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Deve chamar o service getAllUsers ao buscar todos os usuários', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        userController.getAllUsers(mockRequest, mockResponse)

        expect(mockUserService.getAllUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toEqual([
            { name: "Nath", email: "nath@test.com" }
        ])
    })
})
