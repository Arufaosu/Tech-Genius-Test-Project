import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, position } = JSON.parse(req.body)

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        position
      }
