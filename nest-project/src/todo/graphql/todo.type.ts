import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  is_done: boolean;

  @Field()
  created_at: Date;
}
