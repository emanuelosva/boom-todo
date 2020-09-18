/**
 * ***********************************
 * @fileoverview Custom Response Error
 * ***********************************
 */

export class ErrorResponse extends Error {
  public statusCode: number

  constructor(status: number, message: string) {
    super(message)
    this.statusCode = status
  }
}
