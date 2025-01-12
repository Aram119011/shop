
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ProductsEntity } from './Products.entity';
import { ProductVariantsEntity } from './Product-variants.entity';

@Entity('InventoryLogs')
export class InventoryLogsEntity {
  @PrimaryGeneratedColumn()
  logID: number;

  @ManyToOne(() => ProductsEntity, { onDelete: 'CASCADE' })
  product: ProductsEntity;

  @ManyToOne(() => ProductVariantsEntity, { onDelete: 'CASCADE', nullable: true })
  variant: ProductVariantsEntity;

  @Column({ type: 'int' })
  quantityChange: number;

  @Column({ type: 'varchar', length: 255 })
  changeReason: string;

  @CreateDateColumn()
  changeDate: Date;
}
