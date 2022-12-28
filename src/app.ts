import { PrismaClient, User, Post } from "@prisma/client";
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const trpc = initTRPC.create();
const prisma = new PrismaClient();

const appRouter = trpc.router({
    getUserById: trpc.procedure.input(value => {
        if (typeof value === 'string') return value;
        throw new Error(`Invalid input: ${typeof value}`);
    })
    .query(async request => {
        const input = request.input;
        const user = await prisma.user.findFirst({
            where: {
                id: input
            }
        });

        return user;
    }),
    getAllUsers: trpc.procedure.query(async () => {
        const users = await prisma.user.findMany();

        return users;
    }),
    createUser: trpc.procedure.input(values => {
        if(typeof values !== 'object'){
            throw new Error('The new user data must be an object!');
        }

        if(Object.keys(values as Object).length === 0){
            throw new Error('The new user data is empty!');   
        }

        return values as User;
    })
    .mutation(async request => {
        const data: User = {
            id: "",
            role: "BASIC",
            name: request.input?.name,
            age: request.input?.age,
            email: request.input?.email,
            password: request.input?.password,
        };

        const newUser = prisma.user.create({
            data
        });

        return newUser;
    }),
    updateUser: trpc.procedure.input(values => {
        if(typeof values !== 'object'){
            throw new Error('The new user data must be an object!');
        }

        if(Object.keys(values as Object).length === 0){
            throw new Error('The new user data is empty!');   
        }

        return values as User;
    })
    .mutation(async request => {
        const updatedUser = prisma.user.update({
            where: {
                id: request.input?.id
            },
            data: request.input
        });

        return updatedUser;
    }),
    deleteUser: trpc.procedure.input(value => {
        if (typeof value === 'string') return value;
        throw new Error(`Invalid input: ${typeof value}`);
    })
    .mutation(async request => {
        const deletedUser = prisma.user.delete({
            where: {
                id: request.input
            }
        });

        return deletedUser;
    }),
    getAllPosts: trpc.procedure.query(async () => {
        const posts = prisma.post.findMany();

        return posts;
    }),
    getPostById: trpc.procedure.input(value => {
        if(typeof value === "string") return value;
        throw new Error(`Invalid input: ${typeof value}`);
    })
    .query(async request => {
        const post = prisma.post.findFirst({
            where: {
                id: request.input
            }
        });

        return post;
    }),
    createPost: trpc.procedure.input(values => {
        if(typeof values !== 'object'){
            throw new Error('The new post data must be an object!');
        }

        if(Object.keys(values as Object).length === 0){
            throw new Error('The new post data is empty!');   
        }

        return values as Post;
    })
    .mutation(async request => {
        const data : Post = {
            title: request.input?.title,
            id: "",
            averageReating: 0,
            rating: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: request.input?.authorId,
            favoritedById: null
        }

        const post = prisma.post.create({
            data
        });

        return post;
    }),
    updatePost: trpc.procedure.input(values => {
        if(typeof values !== 'object'){
            throw new Error('The new post data must be an object!');
        }

        if(Object.keys(values as Object).length === 0){
            throw new Error('The new post data is empty!');   
        }

        return values as Post;
    })
    .mutation(async request => {
        const updatedPost = prisma.post.update({
            where: {
                id: request.input?.id
            },
            data: request.input
        });

        return updatedPost;
    }),
    deletePost: trpc.procedure.input(value => {
        if (typeof value === 'string') return value;
        throw new Error(`Invalid input: ${typeof value}`)
    })
    .mutation(async request => {
        const deletedPost = prisma.post.delete({
            where: {
                id: request.input
            }
        });

        return deletedPost;
    })
});

createHTTPServer({
    router: appRouter,
    createContext() {
        return {};
    },
}).listen(5000);
