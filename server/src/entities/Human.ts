import { ObjectType, Field } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm'

@ObjectType()
@Entity()
export class Human extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  profilePhotoUrl: string | null

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  bio: string | null

  @Field(() => String)
  @Column({ unique: true })
  username!: string

  @Field(() => String)
  @Column()
  firstName!: string

  @Field(() => String)
  @Column()
  lastName!: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  specialty?: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  major?: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  phonenumber?: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  discordusername?: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
