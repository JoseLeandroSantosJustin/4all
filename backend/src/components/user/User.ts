import { capitalizeAllFirstLetters } from './utils';

export default class User {
  private id = 0;
  private name = '';
  private email = '';
  private password = '';

  constructor(name: string, email: string, password: string, id?: number) {
    this.setName(name);
    this.setEmail(email);
    this.setPassword(password);
    id !== undefined ? this.setId(id) : null;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setName(name: string): void {
    this.name = capitalizeAllFirstLetters(name.trim());
  }

  public getName(): string {
    return this.name;
  }

  public setEmail(email: string): void {
    this.email = email.trim().toLowerCase();
  }

  public getEmail(): string {
    return this.email;
  }

  public setPassword(password: string): void {
    this.password = password.trim();
  }

  public getPassword(): string {
    return this.password;
  }
}
