export default class User {
  private id = 0;
  private email = '';
  private password = '';

  constructor(email: string, password: string, id?: number) {
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
