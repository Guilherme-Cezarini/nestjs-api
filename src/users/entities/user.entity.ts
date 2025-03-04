import { Column, PrimaryColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { IdGeneratorService } from '../../id-generator/id-generator.service';
import { Exclude } from 'class-transformer';
import { Company } from '../../companies/entities/company.entity';
import { BeforeInsert } from 'typeorm';


@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string; 

  @Exclude()
  @Column()
  password: string; 

  @ManyToOne(() => Company, (company) => company.users, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  company_id: string; 

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
  
  @BeforeInsert()
  generateId() {
    const idGeneratorService = new IdGeneratorService();
    this.id = idGeneratorService.generateId();
  }
}
