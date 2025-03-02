import { Column, PrimaryColumn, ManyToOne, JoinColumn, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IdGeneratorService } from '../../id-generator/id-generator.service';
import { BeforeInsert } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';


@Entity()
export class Compaign {
  @PrimaryColumn()
  id: string 

  @Column()
  name: string

  @Column()
  company_id: string

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, (company) => company.compaigns)
  @JoinColumn({ name: 'company_id' })
  company: Company[];

  @BeforeInsert()
  generateId() {
    const idGeneratorService = new IdGeneratorService();
    this.id = idGeneratorService.generateId();
  }
    
}
