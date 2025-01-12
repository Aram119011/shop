
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CustomersEntity } from './Customers.entity';
import { OrderItemsEntity } from './Order-items.entity';

@Entity('Orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  orderID: number;

  @ManyToOne(() => CustomersEntity, { onDelete: 'CASCADE' })
  customer: CustomersEntity;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number;

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  status: string;

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemsEntity[];
}
