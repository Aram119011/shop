
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { CustomersEntity } from './Customers.entity';

@Entity('Orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  OrderID: number;

  @ManyToOne(() => CustomersEntity, (customer) => customer.CustomerID, { nullable: false })
  Customer: CustomersEntity;

  @CreateDateColumn()
  OrderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalAmount: number;

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  Status: string;
}
