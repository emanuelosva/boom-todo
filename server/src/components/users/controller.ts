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
      return Promise.reject(new ErrorResponse(404, 'User not found'))
    }
    return user
  }

  async update(
    where: UserWhereUniqueInput,
    userData: UserUpdateInput,
  ): Promise<User> {
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      userData.password = hashedPassword
    }
    try {
      const user = await this.prisma.user.update({
        where,
        data: userData,
      })
      return user
    } catch (error) {
      return Promise.reject(new ErrorResponse(409, 'Invalid ID'))
    }
  }

  async delete(where: UserWhereUniqueInput): Promise<User> {
    try {
      const user = await this.prisma.user.delete({ where })
      return user
    } catch (error) {
      return Promise.reject(new ErrorResponse(409, 'Invalid ID'))
    }
  }
}
