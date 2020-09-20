/**
 * ***********************************
 * @fileoverview Custom Response Error
 * ***********************************
 */

export class ErrorResponse extends Error {
  public statusCode: number
  public message: string

  constructor(status: number, message: string) {
    super()
    this.statusCode = status
    this.message = message
  }
}
