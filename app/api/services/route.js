import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all services
    const services = await prisma.service.findMany();
    res.status(200).json(services);
  } else if (req.method === 'POST') {
    // Create a new service
    const { name, description, status } = req.body;
    const newService = await prisma.service.create({
      data: { name, description, status },
    });
    res.status(201).json(newService);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
