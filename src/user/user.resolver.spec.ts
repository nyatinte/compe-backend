import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('create() should create a new user', async () => {
    const input = { name: 'Test User', email: 'test@test.com' }
    const user = await resolver.create(input)
    expect(user.name).toBe(input.name)
    expect(user.email).toBe(input.email)
  })
})
