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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../src/prismaClient"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Seeding Bengali News Updates...');
        const newsItems = [
            {
                title: 'বন্যা কবলিত এলাকায় ত্রাণ বিতরণ',
                content: 'সম্প্রতি ভয়াবহ বন্যার কবলে পড়া জেলাগুলোতে ইনসাফ ফাউন্ডেশন খাদ্য সহায়তা এবং প্রয়োজনীয় ত্রাণ সামগ্রী বিতরণ করেছে। আমাদের স্বেচ্ছাসেবীরা জীবনের ঝুঁকি নিয়ে দুর্গত মানুষের পাশে দাঁড়িয়েছে।',
                image: 'https://images.unsplash.com/photo-1547619292-8816ee7cdd50?q=80&w=1000&auto=format&fit=crop',
                category: 'ত্রাণ বিতরণ',
                publishDate: new Date(),
            },
            {
                title: 'শিশুদের জন্য বিনামূল্যে স্বাস্থ্য ক্যাম্প',
                content: 'অসহায় ও সুবিধাবঞ্চিত শিশুদের সুস্বাস্থ্য নিশ্চিত করতে একটি বিশেষ হেলথ ক্যাম্প আয়োজন করা হয়েছে। অভিজ্ঞ ডাক্তারদের মাধ্যমে বিনামূল্যে চিকিৎসা এবং ওষুধ প্রদান করা হচ্ছে।',
                image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop',
                category: 'স্বাস্থ্য সেবা',
                publishDate: new Date(),
            },
            {
                title: 'নতুন শিক্ষা কার্যক্রমের যাত্রা শুরু',
                content: 'শিক্ষাই জাতির মেরুদণ্ড। এই স্লোগানকে সামনে রেখে সুবিধাবঞ্চিত শিশুদের জন্য নতুন একটি অবৈতনিক শিক্ষা কার্যক্রম চালু করেছে ইনসাফ ফাউন্ডেশন।',
                image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop',
                category: 'শিক্ষা সহায়তা',
                publishDate: new Date(),
            },
            {
                title: 'পরিবেশ রক্ষায় বৃক্ষরোপণ অভিযান',
                content: 'জলবায়ু পরিবর্তন মোকাবেলায় আমাদের চারপাশকে সবুজ রাখতে ইনসাফ ফাউন্ডেশনের পক্ষ থেকে বড় পরিসরে বৃক্ষরোপণ অভিযান পরিচালনা করা হচ্ছে।',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
                category: 'পরিবেশ রক্ষা',
                publishDate: new Date(),
            },
            {
                title: 'শীতার্তদের মাঝে কম্বল বিতরণ',
                content: 'তীব্র শীতের প্রকোপ থেকে দরিদ্র মানুষকে রক্ষা করতে রাতের আঁধারে আমাদের কর্মীরা বিভিন্ন এলাকায় গিয়ে কম্বল বিতরণ করছে। আপনার সাহায্য আমাদের আরও মানুষের কাছে পৌঁছাতে সহায়তা করবে।',
                image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000&auto=format&fit=crop',
                category: 'শীতবস্ত্র বিতরণ',
                publishDate: new Date(),
            },
        ];
        try {
            for (const item of newsItems) {
                const news = yield prismaClient_1.default.newsUpdate.create({
                    data: item,
                });
                console.log(`Created news with id: ${news.id}`);
            }
            console.log('Seeding finished.');
        }
        catch (e) {
            console.error('Error during seeding:', e);
        }
        finally {
            // We keep finally but try to see if it works without types, 
            // or we can just call it at the end of try/catch
        }
    });
}
main().then(() => prismaClient_1.default.$disconnect()).catch(() => prismaClient_1.default.$disconnect());
