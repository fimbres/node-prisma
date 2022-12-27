import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {
    // await prisma.user.deleteMany();
    // const user = await prisma.user.create({ 
    //     data: { 
    //         name: 'Isaac Fimbres',
    //         email: 'isaac@gmail.com',
    //         password: 'admin',
    //         age: 22,
    //         userPreference: {
    //             create: {
    //                 emailUpdates: true,
    //             }
    //         }
    //     }
    // });
    const users = await prisma.user.update({
        where: {
            email: 'isaac@gmail.com'
        },
        data: {
            age: 22
        }
    });

    console.log(users);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
