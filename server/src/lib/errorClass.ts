/**
 * ***********************************
 * @fileoverview Custom Response Error
 * ***********************************
 */

export class ResponseError extends Error {
  private readonly statusCode: number

  constructor(status: number, message: string) {
    super()
    this.statusCode = status
    this.message = message
  }

}
