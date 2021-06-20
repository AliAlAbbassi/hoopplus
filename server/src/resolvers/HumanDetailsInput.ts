import { InputType, Field } from 'type-graphql'
@InputType()
export class HumanDetailsInput {
  @Field(() => String, { nullable: true })
  email?: string
  @Field(() => String, { nullable: true })
  username?: string
  @Field(() => String, { nullable: true })
  firstName?: string
  @Field(() => String, { nullable: true })
  lastName?: string
  @Field(() => String, { nullable: true })
  bio?: string
  @Field(() => String, { nullable: true })
  profilePhotoUrl?: string
  @Field(() => String, { nullable: true })
  discordusername?: string
  @Field(() => String, { nullable: true })
  specialty?: string
  @Field(() => String, { nullable: true })
  phonenumber?: string
  @Field(() => String, { nullable: true })
  major?: string
}
