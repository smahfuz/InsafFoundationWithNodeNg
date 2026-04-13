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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Start seeding...');
        // 1. Create Members
        const members = [
            {
                name: 'Mahfuzur Rahman',
                email: 'mahfuz@example.com',
                phone: '01711223344',
                address: 'Dhaka, Bangladesh',
                joinDate: new Date('2024-01-01'),
            },
            {
                name: 'Ayesha Khatun',
                email: 'ayesha@example.com',
                phone: '01811223344',
                address: 'Sylhet, Bangladesh',
                joinDate: new Date('2024-02-15'),
            },
            {
                name: 'Kamrul Hassan',
                email: 'kamrul@example.com',
                phone: '01911223344',
                address: 'Chittagong, Bangladesh',
                joinDate: new Date('2024-03-10'),
            },
            {
                name: 'Nusrat Jahan',
                email: 'nusrat@example.com',
                phone: '01611223344',
                address: 'Rajshahi, Bangladesh',
                joinDate: new Date('2024-04-05'),
            },
            {
                name: 'Test Member',
                email: 'test@example.com',
                phone: '01511223344',
                address: 'Bishnupur',
                joinDate: new Date(),
            },
        ];
        for (const m of members) {
            const member = yield prisma.member.upsert({
                where: { email: m.email },
                update: {},
                create: m,
            });
            console.log(`Created member with id: ${member.id}`);
            // 2. Create some donations for each member
            yield prisma.donation.createMany({
                data: [
                    {
                        amount: 1000,
                        memberId: member.id,
                        date: new Date('2024-05-01'),
                    },
                    {
                        amount: 500,
                        memberId: member.id,
                        date: new Date('2024-06-01'),
                    },
                ],
            });
        }
        // 3. Create News Updates
        const news = [
            {
                title: 'Monthly Food Distribution',
                content: 'We distributed food packs to 100 families this month.',
                publishDate: new Date('2024-05-20'),
            },
            {
                title: 'Free Health Camp',
                content: 'A successful health camp was organized in the village.',
                publishDate: new Date('2024-06-05'),
            },
        ];
        for (const n of news) {
            yield prisma.newsUpdate.create({
                data: n,
            });
        }
        // 4. Create Committee
        const committee = yield prisma.committee.upsert({
            where: { year: 2024 },
            update: {},
            create: {
                year: 2024,
                isActive: true,
            },
        });
        const mahfuz = yield prisma.member.findUnique({ where: { email: 'mahfuz@example.com' } });
        if (mahfuz) {
            yield prisma.committeeMember.upsert({
                where: { memberId_committeeId: { memberId: mahfuz.id, committeeId: committee.id } },
                update: {},
                create: {
                    role: 'President',
                    memberId: mahfuz.id,
                    committeeId: committee.id,
                },
            });
        }
        console.log('Seeding finished.');
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
