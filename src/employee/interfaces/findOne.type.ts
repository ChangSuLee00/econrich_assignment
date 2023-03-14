export interface EmployeeFindOne {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: Date;
  job_id: string;
  salary: number;
  commission_pct: number;
  manager_id: number;
  department_id: number;
}
