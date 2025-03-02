import { Column, PrimaryColumn, OneToMany, UpdateDateColumn, CreateDateColumn, Entity } from "typeorm";
import { IdGeneratorService } from '../../id-generator/id-generator.service';
import { BeforeInsert } from 'typeorm'
import { User } from '../../users/entities/user.entity';
import { Compaign } from "src/compaigns/entities/compaign.entity";
 
@Entity()
export class Company {
  @PrimaryColumn()
  id: string 

  @Column()
  document: string 

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
    

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Compaign, (compaign) => compaign.company)
  compaigns: User[];

  @BeforeInsert()
  generateId() {
    const idGeneratorService = new IdGeneratorService();
    this.id = idGeneratorService.generateId();
  }
}
