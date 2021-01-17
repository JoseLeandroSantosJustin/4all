export default class Media {
  private idMedia: number;
  private title: string;
  private director: string;
  private isRented = false;

  constructor(
    idMedia: number,
    title: string,
    director: string,
    isRented: boolean
  ) {
    this.idMedia = idMedia;
    this.title = title;
    this.director = director;
    this.setIsRented(isRented);
  }

  public getIdMedia(): number {
    return this.idMedia;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDirector(): string {
    return this.director;
  }

  public setIsRented(isRented: boolean): void {
    this.isRented = isRented;
  }

  public getIsRented(): boolean {
    return this.isRented;
  }
}
