
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrdersEntity } from './Orders.entity';
import { ProductsEntity } from './Products.entity';
import { ProductVariantsEntity } from './Product-variants.entity';

@Entity('OrderItems')
export class OrderItemsEntity {
  @PrimaryGeneratedColumn()
  orderItemID: number;

  @ManyToOne(() => OrdersEntity, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: OrdersEntity;

  @ManyToOne(() => ProductsEntity, { onDelete: 'CASCADE' })
  product: ProductsEntity;

  @ManyToOne(() => ProductVariantsEntity, { onDelete: 'CASCADE', nullable: true })
  variant: ProductVariantsEntity;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
