import { Column, PrimaryColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { IdGeneratorService } from '../../id-generator/id-generator.service';
import { Company } from '../../companies/entities/company.entity';
import { BeforeInsert } from 'typeorm';


@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string; 

  @Column()
  //@IsNotEmpty()
  password: string; 

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: Company;

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
