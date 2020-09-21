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
} from '@prisma/client'
import { connect } from 'http2'
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

}
