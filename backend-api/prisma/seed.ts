import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seed start...');

    // 기존 데이터 삭제 (관계 역순)
    await prisma.dailyStat.deleteMany();
    await prisma.event.deleteMany();
    await prisma.channelAccount.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();

    // 1. 사용자 생성
    const user = await prisma.user.create({
        data: {
            email: 'demo@adsaas.com',
            name: 'Demo User',
        },
    });

    // 2. 프로젝트 생성
    const projectA = await prisma.project.create({
        data: {
            userId: user.id,
            name: 'Atomos Campaign',
            domain: 'atomos-demo.com',
        },
    });

    const projectB = await prisma.project.create({
        data: {
            userId: user.id,
            name: 'Brand Growth',
            domain: 'brand-growth.com',
        },
    });

    const projectC = await prisma.project.create({
        data: {
            userId: user.id,
            name: 'Performance Max',
            domain: 'performance-max.com',
        },
    });

    // 3. 채널 계정 생성
    const channelA1 = await prisma.channelAccount.create({
        data: {
            projectId: projectA.id,
            channelType: 'META',
            accountName: 'Meta Account A',
            externalAccountId: 'meta_001',
            isActive: true,
        },
    });

    const channelA2 = await prisma.channelAccount.create({
        data: {
            projectId: projectA.id,
            channelType: 'GOOGLE',
            accountName: 'Google Ads A',
            externalAccountId: 'google_001',
            isActive: true,
        },
    });

    const channelB1 = await prisma.channelAccount.create({
        data: {
            projectId: projectB.id,
            channelType: 'META',
            accountName: 'Meta Account B',
            externalAccountId: 'meta_002',
            isActive: true,
        },
    });

    const channelB2 = await prisma.channelAccount.create({
        data: {
            projectId: projectB.id,
            channelType: 'TIKTOK',
            accountName: 'TikTok Ads B',
            externalAccountId: 'tiktok_001',
            isActive: true,
        },
    });

    const channelC1 = await prisma.channelAccount.create({
        data: {
            projectId: projectC.id,
            channelType: 'GOOGLE',
            accountName: 'Google Ads C',
            externalAccountId: 'google_002',
            isActive: true,
        },
    });

    const channelC2 = await prisma.channelAccount.create({
        data: {
            projectId: projectC.id,
            channelType: 'NAVER',
            accountName: 'Naver Ads C',
            externalAccountId: 'naver_001',
            isActive: true,
        },
    });

    // 4. 이벤트 생성
    await prisma.event.createMany({
        data: [
            {
                projectId: projectA.id,
                channelAccountId: channelA1.id,
                eventType: 'CLICK',
                visitorId: 'visitor_001',
                pageUrl: '/landing/main',
                referrer: 'facebook.com',
                occurredAt: new Date('2026-04-01T09:00:00'),
            },
            {
                projectId: projectA.id,
                channelAccountId: channelA1.id,
                eventType: 'VIEW',
                visitorId: 'visitor_002',
                pageUrl: '/landing/main',
                referrer: 'facebook.com',
                occurredAt: new Date('2026-04-01T11:00:00'),
            },
            {
                projectId: projectA.id,
                channelAccountId: channelA2.id,
                eventType: 'PURCHASE',
                visitorId: 'visitor_003',
                pageUrl: '/checkout',
                referrer: 'google.com',
                occurredAt: new Date('2026-04-02T14:00:00'),
            },
            {
                projectId: projectB.id,
                channelAccountId: channelB1.id,
                eventType: 'CLICK',
                visitorId: 'visitor_004',
                pageUrl: '/brand',
                referrer: 'facebook.com',
                occurredAt: new Date('2026-04-03T10:00:00'),
            },
            {
                projectId: projectB.id,
                channelAccountId: channelB2.id,
                eventType: 'SIGNUP',
                visitorId: 'visitor_005',
                pageUrl: '/signup',
                referrer: 'tiktok.com',
                occurredAt: new Date('2026-04-04T16:00:00'),
            },
            {
                projectId: projectC.id,
                channelAccountId: channelC1.id,
                eventType: 'VIEW',
                visitorId: 'visitor_006',
                pageUrl: '/home',
                referrer: 'google.com',
                occurredAt: new Date('2026-04-05T08:30:00'),
            },
            {
                projectId: projectC.id,
                channelAccountId: channelC2.id,
                eventType: 'PURCHASE',
                visitorId: 'visitor_007',
                pageUrl: '/checkout',
                referrer: 'search.naver.com',
                occurredAt: new Date('2026-04-06T19:20:00'),
            },
            {
                projectId: projectC.id,
                channelAccountId: channelC2.id,
                eventType: 'CLICK',
                visitorId: 'visitor_008',
                pageUrl: '/contact',
                referrer: 'search.naver.com',
                occurredAt: new Date('2026-04-07T13:00:00'),
            },
            {
                projectId: projectA.id,
                channelAccountId: channelA1.id,
                eventType: 'VIEW',
                visitorId: 'visitor_009',
                pageUrl: '/landing/main',
                referrer: 'instagram.com',
                occurredAt: new Date('2026-04-08T10:15:00'),
            },
        ],
    });

    // 5. 일별 통계 생성
    await prisma.dailyStat.createMany({
        data: [
            {
                projectId: projectA.id,
                statDate: new Date('2026-04-01'),
                impressions: 1200,
                clicks: 85,
                conversions: 7,
                spend: '120.50',
                revenue: '430.00',
            },
            {
                projectId: projectA.id,
                statDate: new Date('2026-04-02'),
                impressions: 1380,
                clicks: 92,
                conversions: 9,
                spend: '132.00',
                revenue: '510.00',
            },
            {
                projectId: projectB.id,
                statDate: new Date('2026-04-01'),
                impressions: 980,
                clicks: 64,
                conversions: 4,
                spend: '98.40',
                revenue: '250.00',
            },
            {
                projectId: projectB.id,
                statDate: new Date('2026-04-02'),
                impressions: 1105,
                clicks: 71,
                conversions: 6,
                spend: '105.00',
                revenue: '310.00',
            },
            {
                projectId: projectC.id,
                statDate: new Date('2026-04-01'),
                impressions: 1540,
                clicks: 101,
                conversions: 11,
                spend: '160.75',
                revenue: '620.00',
            },
            {
                projectId: projectC.id,
                statDate: new Date('2026-04-02'),
                impressions: 1495,
                clicks: 97,
                conversions: 10,
                spend: '152.20',
                revenue: '590.00',
            },
        ],
    });

    console.log('✅ Seed finished.');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });