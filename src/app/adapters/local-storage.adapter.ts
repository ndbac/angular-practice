export class LocalStorageService {
  private repo: Storage;

  constructor() {
    this.repo = localStorage;
  }

  get(key: string): string | null {
    return this.repo.getItem(key);
  }

  set(key: string, value: string): void {
    this.repo.setItem(key, value);
  }

  remove(key: string): void {
    this.repo.removeItem(key);
  }
}
