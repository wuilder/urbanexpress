import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Content } from '../content/content.entity';
import { UserCourse } from '../userCourse/userCourse.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dateCreated: Date;

  @OneToMany(() => Content, (content) => content.course)
  contents: Content[];

  @OneToMany(() => UserCourse, (userCourse) => userCourse.course)
  users: UserCourse[];
}
