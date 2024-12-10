import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



async function main() {
    const task_name = "New task";

    const existingTask = await prisma.task.findFirst({
        where: { title: task_name },
    });
    
    const task = existingTask
        ? await prisma.task.update({
            where: { id: existingTask.id },
            data: { description: 'Updated description' },
        })
        : await prisma.task.create({
            data: {
                title: 'Task from Prisma',
                description: 'Seed data created',
                status: "Terminée",
            },
      });
    console.log({ task });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });