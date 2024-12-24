
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Admins')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  AdminID: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  Username: string;

  @Column({ type: 'varchar', length: 255 })
  PasswordHash: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  Email: string;

  @CreateDateColumn()
  CreatedAt: Date;
}

