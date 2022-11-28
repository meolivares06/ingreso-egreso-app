export class Usuario {
  // @ts-ignore
  static fromFirebase({uid, email, nombre}) {
    return new Usuario(uid, nombre, email);
  }
  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  ) {
  }
}
