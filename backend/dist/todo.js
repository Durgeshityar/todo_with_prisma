"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoAndUserDetails = exports.getTodo = exports.createTodo = void 0;
const client_1 = require("../prisma/node_modules/.prisma/client");
const console_1 = require("console");
const prisma = new client_1.PrismaClient();
//Creating Todos
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todo = yield prisma.todo.create({
                data: {
                    title,
                    description,
                    userId,
                },
            });
            return todo;
        }
        catch (err) {
            console.error(console_1.error);
            throw new Error(' Todo Creation failed');
        }
    });
}
exports.createTodo = createTodo;
// Getting todos
function getTodo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todo = yield prisma.todo.findMany({
                where: {
                    userId: userId,
                },
            });
            return todo;
        }
        catch (err) {
            console.error(err);
            throw new Error(' Cannot get Todos');
        }
    });
}
exports.getTodo = getTodo;
// for seeing both user and todo
function getTodoAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const details = yield prisma.todo.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    user: true,
                    title: true,
                    description: true,
                },
            });
            return details;
        }
        catch (err) {
            console.error(err);
            throw new Error('cannot get user and tdod details');
        }
    });
}
exports.getTodoAndUserDetails = getTodoAndUserDetails;
