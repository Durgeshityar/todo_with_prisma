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
exports.getUser = exports.updateUser = exports.insertUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// creating new user
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.create({
                data: {
                    username,
                    password,
                    firstName,
                    lastName,
                },
            });
            return res;
        }
        catch (error) {
            console.error(error);
            throw new Error('User creation failed');
        }
    });
}
exports.insertUser = insertUser;
function updateUser(username, { firstName, lastName }) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: { username },
            data: {
                firstName,
                lastName,
            },
        });
    });
}
exports.updateUser = updateUser;
// Get user Details
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.findFirst({
                where: {
                    username: username,
                },
            });
            return res;
        }
        catch (err) {
            console.error(err);
            throw new Error('cant get details ');
        }
    });
}
exports.getUser = getUser;
