export interface Employee {
  id: number;
  name: string;
  surname: string;
  job: string;
  salary: number;
  /* canviar interface a class, pero dona problemes al cridar els metodes, diu que no son funcions :s
  isValidSalary_str(salary: string): boolean{
    this.salary = Number(salary.trim());
    return this.isValidSalary();
  }

  isValidSalary(): boolean{
    return isNaN(this.salary)? false : this.salary>=0;
  }
  */
}