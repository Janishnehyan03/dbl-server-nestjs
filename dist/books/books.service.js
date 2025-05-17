"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_schema_1 = require("./book.schema");
let BooksService = class BooksService {
    bookModel;
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async create(createBookDto) {
        return this.bookModel.create(createBookDto);
    }
    async findAll() {
        return this.bookModel
            .find()
            .populate('publisher')
            .populate('categories')
            .populate('authors')
            .exec();
    }
    async findOne(id) {
        const book = await this.bookModel
            .findById(id)
            .populate('authors')
            .populate('categories')
            .populate('publisher').populate('location')
            .populate('language')
            .exec();
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
            new: true,
        });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async getNewArrivals() {
        const books = await this.bookModel
            .find({ isNewArrival: true, published: true })
            .populate('publisher')
            .populate('categories')
            .populate('authors')
            .exec();
        if (books.length > 0) {
            return books;
        }
        return this.bookModel
            .find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('publisher')
            .populate('categories')
            .populate('authors')
            .exec();
    }
    async getBooksByCategory(categoryId) {
        return this.bookModel
            .find({ categories: categoryId })
            .populate('publisher')
            .populate('categories')
            .populate('authors')
            .exec();
    }
    async searchBooks(searchText) {
        if (!searchText?.trim()) {
            throw new common_1.BadRequestException('Search text is required.');
        }
        const regex = new RegExp(searchText.trim(), 'i');
        const books = await this.bookModel
            .find({
            $or: [
                { title: regex },
                { accNumber: regex },
                { callNumber: regex },
                { isbn: regex },
                { 'authors.name': regex },
            ],
        })
            .populate(['publisher', 'categories', 'authors'])
            .exec();
        if (!books.length) {
            throw new common_1.NotFoundException('No books found matching the search criteria.');
        }
        return books;
    }
    async remove(id) {
        const result = await this.bookModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Book not found');
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BooksService);
//# sourceMappingURL=books.service.js.map