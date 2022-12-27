import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {
    const user = await prisma.user.create({ data: { 
        name: 'Isaac Fimbres',
        email: 'isaac@gmail.com',
        password: 'admin'
    }});

    console.log(user);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
