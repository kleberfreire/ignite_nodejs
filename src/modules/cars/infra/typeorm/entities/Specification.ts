import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, PrimaryColumn, Entity } from "typeorm"
@Entity("specification")
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Specification };
