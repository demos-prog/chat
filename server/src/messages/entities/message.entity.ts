import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Messages' })
export class Message extends Model<Message> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    allowNull: false,
  })
  id!: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  message: string;

  @Column
  author: string;
}