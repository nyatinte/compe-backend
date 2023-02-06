import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('create() should create a new user', async () => {
    const input = { name: 'Test User', email: 'test@test.com' }
    const user = await service.create(input)
    expect(user.name).toBe(input.name)
    expect(user.email).toBe(input.email)
  })
})
