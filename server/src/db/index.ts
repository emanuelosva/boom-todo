/**
 * *************************************
 * @fileoverview Export Prisma db client
 * *************************************
 */

import { PrismaClient } from '@prisma/client'

/**
 * Return a unic prisma client instance
 */
export class PrismaDb {
  private static prisma: PrismaClient

  public static getPrismaClient(): PrismaClient {
    if (!PrismaDb.prisma) {
      PrismaDb.prisma = new PrismaClient()
    }
    return PrismaDb.prisma
  }
}
