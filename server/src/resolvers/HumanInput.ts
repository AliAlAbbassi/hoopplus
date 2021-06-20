import { InputType, Field } from 'type-graphql'
@InputType()
export class HumanInput {
  @Field(() => String, { nullable: true })
  email?: string
  @Field()
  username: string
  @Field(() => String, { nullable: true })
  bio?: string | null
  @Field(() => String, { nullable: true })
  profilePhotoUrl?: string | null
  @Field(() => String, { nullable: true })
  firstName?: string | null
  @Field(() => String, { nullable: true })
  lastName?: string | null
  @Field(() => String, { nullable: true })
  specialty?: string | null
  @Field(() => String, { nullable: true })
  discordusername?: string | null
  @Field(() => String, { nullable: true })
  phonenumber?: string | null
  @Field(() => String, { nullable: true })
  major?: string | null
}
