import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
  InputType,
} from 'type-graphql'
import { MyContext } from '../types'
import { Human } from '../entities/Human'
import { HumanDetailsInput } from './HumanDetailsInput'
import { validateRegister } from '../utils/validateRegister'
import { validateHumanDetails } from '../utils/validateHumanDetails'
import { getConnection } from 'typeorm'
import { HumanInput } from './HumanInput'

@InputType()
export class userIdInput {
  @Field(() => String, { nullable: true })
  userId: string
}

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class HumanResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Human, { nullable: true })
  human?: Human
}

@Resolver(Human)
export class HumanResolver {
  @FieldResolver(() => String)
  email(@Root() human: Human, @Ctx() { req }: MyContext) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === human.id) {
      return human.email
    }
    // current user wants to see someone elses email
    return ''
  }

  @Query(() => Human, { nullable: true })
  showHuman(@Ctx() { req }: MyContext, @Arg('options') options: userIdInput) {
    return Human.findOne(req.session.userId || options.userId)
  }

  @Mutation(() => HumanResponse)
  async createHuman(
    @Arg('options') options: HumanInput
  ): Promise<HumanResponse> {
    const errors = validateRegister(options)
    if (errors) {
      console.log('errors bruh', errors)
      return { errors }
    }

    let human
    try {
      // Human.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Human)
        .values({
          username: options.username,
          email: options.email!,
          firstName: options.firstName!,
          lastName: options.lastName!,
          discordusername: options.discordusername!,
          phonenumber: options.phonenumber!,
          bio: options.bio!,
          profilePhotoUrl: options.profilePhotoUrl!,
          specialty: options.specialty!,
        })
        .returning('*')
        .execute()
      human = result.raw[0]
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      // if (err.code === '23505') {
      //   return {
      //     errors: [
      //       {
      //         field: 'username',
      //         message: 'username already taken',
      //       },
      //     ],
      //   }
      // }
      console.log(err)
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    // req.session.userId = human.id

    return { human: human }
  }

  @Mutation(() => HumanResponse)
  async updateHumanDetails(
    @Arg('options') options: HumanDetailsInput
  ): Promise<HumanResponse> {
    const errors = validateHumanDetails(options)
    if (errors) {
      return { errors }
    }

    let human
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .update(Human)
        .set({ ...options })
        .returning('*')
        .execute()
      human = result.raw[0]
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        }
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    // req.session.userId = human.id

    return { human }
  }
}
