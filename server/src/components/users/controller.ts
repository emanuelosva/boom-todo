/**
 * ******************************
 * @fileoverview Users controller
 * ******************************
 */

import bcrypt from 'bcrypt'
import axios from 'axios'
import {
  PrismaClient,
  User,
  UserCreateInput,
  UserUpdateInput,
  UserWhereUniqueInput,
} from '@prisma/client'
import { PrismaDb } from '../../db'
import { ErrorResponse } from '../../lib/errorClass'
import { config } from '../../config'

export interface AuthResponse {
  user: User | null,
  token: string
}

/**
 * Bussiness logic for user operations
 */
export class UserController {

  constructor(
    private readonly prisma: PrismaClient = PrismaDb.getPrismaClient()
  ) { }

  async create(userData: UserCreateInput): Promise<AuthResponse> {
    const { name, email, password } = userData
    const userUseTheEmail = await this.prisma.user.findOne({ where: { email } })

    if (userUseTheEmail) {
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

  async login(credentials: {
    email: string,
    password: string
  }): Promise<AuthResponse> {
    const { email, password } = credentials
    let token: string
    try {
      const { data } = await axios({
        url: config.auth.apiRoute,
        method: 'POST',
        data: { email, password }
      })
      token = data.token
    } catch (error) {
      return Promise.reject(new ErrorResponse(error.response.status, ''))
    }
    const user = await this.prisma.user.findOne({ where: { email } })
    return { user, token }
  }

  async get(userQuery: UserWhereUniqueInput): Promise<User | null> {
    const user = await this.prisma.user.findOne({ where: userQuery })
    if (!user) {
      return Promise.reject(new ErrorResponse(404, 'User notFound'))
    }
    return user
  }

  // async update(
  //   where: UserWhereUniqueInput,
  //   userData: UserUpdateInput,
  // ): Promise<User> {
  //   const { name, email, password } = userData
  //   const hashedPassword = await bcrypt.hash(password, 10)

  //   const user = await this.prisma.user.update({
  //     where,
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
}
