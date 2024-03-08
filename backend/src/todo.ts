import { PrismaClient } from '@prisma/client'
import { error } from 'console'

const prisma = new PrismaClient()

//Creating Todos

export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    })
    return todo
  } catch (err) {
    console.error(error)
    throw new Error(' Todo Creation failed')
  }
}

// Getting todos

export async function getTodo(userId: number) {
  try {
    const todo = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    })
    return todo
  } catch (err) {
    console.error(err)
    throw new Error(' Cannot get Todos')
  }
}

// for seeing both user and todo

export async function getTodoAndUserDetails(userId: number) {
  try {
    const details = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
      select: {
        user: true,
        title: true,
        description: true,
      },
    })
    return details
  } catch (err) {
    console.error(err)
    throw new Error('cannot get user and tdod details')
  }
}
