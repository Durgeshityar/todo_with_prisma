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
const express = require('express');
const user_1 = require("./user");
const todo_1 = require("./todo");
const app = express();
app.use(express.json());
// creating user
app.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    try {
        const response = yield (0, user_1.insertUser)(username, password, firstName, lastName);
        res
            .status(201)
            .json({ message: 'User created successfully', user: response });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Internal server error( cant get details)' });
    }
}));
//getting user details
app.get('/detailUser/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    try {
        const response = yield (0, user_1.getUser)(username);
        res.status(201).json({ message: 'recieved details', details: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error ' });
    }
}));
// creating Todos
app.post('/addtodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    try {
        const response = yield (0, todo_1.createTodo)(userId, title, description);
        res.status(201).json({ message: 'added todo', todo: response });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Api error : cant create todo' });
    }
}));
//getting todos
app.get('/getTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    try {
        const response = yield (0, todo_1.getTodo)(userId);
        res.status(201).json({
            message: 'retrived todos',
            WebTransportBidirectionalStream: response,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Api Error : cant get todos' });
    }
}));
// Getting todos and User and User detail
app.get('/getTodoandUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    try {
        const response = yield (0, todo_1.getTodoAndUserDetails)(userId);
        res.status(201).json({
            message: 'retrived todos',
            WebTransportBidirectionalStream: response,
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ message: 'Api Error : cant get todos and user details' });
    }
}));
app.listen(3000, () => {
    console.log('server is running on port 3000');
});
