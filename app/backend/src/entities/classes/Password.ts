class Password {
  static verifyPassword(password: string) {
    return password.length > 6;
  }
}

export default Password;
