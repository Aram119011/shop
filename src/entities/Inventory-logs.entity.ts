
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ProductsEntity } from './Products.entites';
import { ProductVariantsEntity } from './Product-variants.entity';

@Entity('InventoryLogs')
export class InventoryLogsEntity {
  @PrimaryGeneratedColumn()
  LogID: number;

  @ManyToOne(() => ProductsEntity, (product) => product.ProductID, { nullable: false })
  Product: ProductsEntity;

  @ManyToOne(() => ProductVariantsEntity, (variant) => variant.VariantID, { nullable: true })
  Variant: ProductVariantsEntity;

  @Column({ type: 'int', nullable: false })
  QuantityChange: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ChangeReason: string;

  @CreateDateColumn()
  ChangeDate: Date;
}
