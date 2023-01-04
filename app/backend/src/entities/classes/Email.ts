class Email {
  private static readonly regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static verifyEmail(email: string) {
    const isValid = Email.regx.test(email);
    return isValid;
  }
}

export default Email;
