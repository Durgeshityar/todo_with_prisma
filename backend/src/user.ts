import { PrismaClient } from '../prisma/node_modules/.prisma/client'

const prisma = new PrismaClient()

// creating new user
export async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const res = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
      },
    })

    return res
  } catch (error) {
    console.error(error)
    throw new Error('User creation failed')
  }
}

// Updating user infos

interface updateParams {
  firstName: string
  lastName: string
}

export async function updateUser(
  username: string,
  { firstName, lastName }: updateParams
) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
      lastName,
    },
  })
}

// Get user Details

export async function getUser(username: string) {
  try {
    const res = await prisma.user.findFirst({
      where: {
        username: username,
      },
    })
    return res
  } catch (err) {
    console.error(err)
    throw new Error('cant get details ')
  }
}
