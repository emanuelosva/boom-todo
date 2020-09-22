/**
 * ******************************
 * @fileoverview Todos controller
 * ******************************
 */

import {
  PrismaClient,
  Todo,
  TodoUpdateInput,
  TodoWhereUniqueInput,
  UserWhereUniqueInput
} from '@prisma/client'
import { PrismaDb } from '../../db'
import { ErrorResponse } from '../../lib/errorClass'

export interface TodoCreateInputCustom {
  title: string,
  content: string,
  isUrgent?: boolean | undefined,
  tag: string,
  createdAt?: string | Date | undefined,
  updatedAt?: string | Date | undefined,
  dateTodo: Date | string,
}

/**
 * Bussiness logic for todo operations
 */
export class TodoController {
  constructor(
    private readonly prisma: PrismaClient = PrismaDb.getPrismaClient()
  ) { }

  async create(id: number, todoData: TodoCreateInputCustom): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        ...todoData,
        user: { connect: { id } }
      }
    })
  }

  async get(userQuery: UserWhereUniqueInput): Promise<Todo[]> {
    return this.prisma.user.findOne({ where: userQuery }).todos()
  }

  async getOne(where: TodoWhereUniqueInput): Promise<Todo> {
    const todo = await this.prisma.todo.findOne({ where })
    if (!todo) return Promise.reject(new ErrorResponse(404, 'Todo not found'))
    return todo
  }

  async update(
    where: TodoWhereUniqueInput,
    todoData: TodoUpdateInput
  ): Promise<Todo> {
    try {
      const { dateTodo } = todoData
      dateTodo ? todoData.dateTodo = new Date(String(dateTodo)) : ''
      const todo = await this.prisma.todo.update({
        where,
        data: todoData,
      })
      return todo
    } catch (error) {
      return Promise.reject(new ErrorResponse(409, 'Invalid ID'))
    }
  }

  async delete(where: TodoWhereUniqueInput): Promise<Todo> {
    try {
      const todo = await this.prisma.todo.delete({ where })
      return todo
    } catch (error) {
      return Promise.reject(new ErrorResponse(409, 'Invalid ID'))
    }
  }

}
