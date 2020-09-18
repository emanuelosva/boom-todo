/**
 * ******************************
 * @fileoverview Users controller
 * ******************************
 */

import bcrypt from 'bcrypt'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { PrismaDb } from '../../db'
import { ErrorResponse } from '../../lib/errorClass'
import { config } from '../../config'

export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  todos?: unknown[],
}

export interface AuthResponse {
  user: User | null,
  token: string
}

/**
 * Bussiness logic for user operations
 */
export class UserController {
  private prisma: PrismaClient

  constructor() {
    this.prisma = PrismaDb.getPrismaClient()
  }

  async create(
    { name, email, password }: Record<string, string>
  ): Promise<AuthResponse> {

    const userUseEmail = await this.prisma.user.findOne({ where: { email } })
    if (userUseEmail) {
      return Promise.reject(new ErrorResponse(409, 'Email already exists'))
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    let token: string

    try {
      const { data } = await axios({
        url: config.auth.apiRoute,
        method: 'POST',
        data: { email, password }
      })
      token = data.token
    } catch (error) {
      return Promise.reject(new ErrorResponse(error.response.status, error.message))
    }

    return { user, token }
  }

  // async update({ id, name, email, password }: Record<string, string>): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 10)
  //   const user = await this.prisma.user.update({
  //     where: { id: Number(id) },
  //     data: { name, email, password: hashedPassword }
  //   })
  //   if (!user) return Promise.reject(new ErrorResponse(400, 'Invalid ID'))
  //   return user
  // }

  // async delete({ id }: Record<string, string>): Promise<User> {
  //   const user = await this.prisma.user.delete({
  //     where: { id: Number(id) }
  //   })
  //   if (!user) return Promise.reject(new ErrorResponse(400, 'Invalid ID'))
  //   return user
  // }

  // async login({ email, password }: Record<string, string>): Promise<AuthResponse> {
  //   let token: string
  //   try {
  //     const { data } = await axios({
  //       url: config.auth.apiRoute,
  //       method: 'POST',
  //       data: { email, password }
  //     })
  //     token = data.token
  //   } catch (error) {
  //     return Promise.reject(new ErrorResponse(error.response.status, ''))
  //   }
  //   const user: User | null = await this.prisma.user.findOne({ where: { email } })
  //   return { user, token }
  // }
}
