
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Customers')
export class CustomersEntity {
  @PrimaryGeneratedColumn()
  CustomerID: number;

  @Column({ type: 'varchar', length: 255 })
  FirstName: string;

  @Column({ type: 'varchar', length: 255 })
  LastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  Email: string;

  @Column({ type: 'varchar', length: 255 })
  PasswordHash: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  Phone: string;

  @Column({ type: 'text', nullable: true })
  Address: string;

  @CreateDateColumn()
  CreatedAt: Date;
}
