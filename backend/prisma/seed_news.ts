import prisma from '../src/prismaClient';

async function main() {
  console.log('Seeding Vishnupur News Updates...');

  try {
    // Clear existing news first
    await prisma.newsUpdate.deleteMany();
    console.log('Deleted existing news.');

    const newsItems = [
      {
        title: 'বিষ্ণুপুর যুব সমাজের রক্তদান কর্মসূচি',
        content: 'বিষ্ণুপুর গ্রামের এক মুমূর্ষু রোগীর জরুরি প্রয়োজনে যুব সমাজের সদস্যরা রক্তদানের মাধ্যমে তার জীবন বাঁচাতে এগিয়ে আসে। এই মহতী উদ্যোগ গ্রামজুড়ে প্রশংসা কুড়িয়েছে। যুবকরা জানায়, তারা সব সময় মানুষের সেবায় প্রস্তুত।',
        category: 'রক্তদান',
        image: 'blood donation.jpg',
        publishDate: new Date(),
      },
      {
        title: 'বন্যার্তদের জন্য তহবিল সংগ্রহ অভিযান',
        content: 'ক্ষতিগ্রস্ত অসহায় মানুষের পাশে দাঁড়াতে বিষ্ণুপুর যুব সমাজের উদ্যোগে বিশাল এক ত্রাণ তহবিল সংগ্রহ করা হয়েছে। গ্রামবাসী এবং যুবকদের সম্মিলিত প্রচেষ্টায় সংগৃহীত অর্থ ও সামগ্রী পৌঁছে দেওয়া হবে দুর্গত এলাকায়।',
        category: 'ত্রাণ সহায়তা',
        image: 'flood fund collection.jpg',
        publishDate: new Date(),
      },
      {
        title: 'অসহায় পরিবারের জন্য দোকান নির্মাণ',
        content: 'বিষ্ণুপুর গ্রামে এক হতদরিদ্রকে স্বাবলম্বী করার লক্ষ্যে স্থানীয় যুবকরা একটি ছোট দোকান তৈরি করে দিয়েছে। এখন থেকে ওই পরিবারের ভরণপোষণের পথ সুগম হলো। এটি যুব সমাজের একটি দৃষ্টান্তমূলক উন্নয়নমূলক কাজ।',
        category: 'কর্মসংস্থান',
        image: 'poor people er shop making.jpg',
        publishDate: new Date(),
      },
      {
        title: 'বিষ্ণুপুর গ্রামে শীতবস্ত্র ও কম্বল বিতরণ',
        content: 'তীব্র শীতের প্রকোপ থেকে দরিদ্র মানুষকে রক্ষা করতে বিষ্ণুপুর যুব সমাজ রাতের আঁধারে বিভিন্ন বাড়িতে গিয়ে কম্বল বিতরণ করেছে। এই হাড়কাঁপানো শীতে অসহায় মানুষের মুখে হাসি ফুটিয়েছে আমাদের যুবকরা।',
        category: 'শীতবস্ত্র বিতরণ',
        image: 'winter a kombol bitoron.jpg',
        publishDate: new Date(),
      },
      {
        title: 'গ্রামের শিশুদের বিজ্ঞান মেলা ও প্রশিক্ষণ',
        content: 'বিষ্ণুপুর গ্রামের শিশুদের বিজ্ঞান ও প্রযুক্তিতে আগ্রহী করে তুলতে বিষ্ণুপুর ফাউন্ডেশনের উদ্যোগে একটি বিজ্ঞান প্রশিক্ষণ কর্মসূচির আয়োজন করা হয়। অনেক শিশু সতঃস্ফূর্তভাবে এখানে অংশগ্রহণ করে।',
        category: 'শিক্ষা',
        image: 'small child schiense learn.jpg',
        publishDate: new Date(),
      },
      {
        title: 'রুটিন ফুটবল প্র্যাকটিস ও যুব উন্নয়ন',
        content: 'যুব সমাজকে মাদক ও খারাপ অভ্যাস থেকে দূরে রাখতে নিয়মিত ফুটবল প্র্যাকটিস ও খেলাধুলার আয়োজন করছে বিষ্ণুপুর স্পোর্টিং ক্লাব। এতে গ্রামের তরুণদের মধ্যে ভ্রাতৃত্ববোধ ও শারীরিক সক্ষমতা বৃদ্ধি পাচ্ছে।',
        category: 'ক্রীড়া',
        image: 'small playes footbal practice.jpg',
        publishDate: new Date(),
      },
      {
        title: 'গ্রামের দ্বীনি মহফিল ও সমাজ সংস্কার',
        content: 'বিষ্ণুপুর গ্রামে একটি ধর্মীয় ওয়াজ মাহফিল ও আলোচনা সভার আয়োজন করা হয়েছে যেখানে নৈতিকতা ও সমাজ সংস্কার বিষয়ে গুরুত্বারোপ করা হয়। যুবকরা এই আয়োজনে স্বেচ্ছাসেবক হিসেবে ব্যাপক দায়িত্ব পালন করে।',
        category: 'ধর্মীয় সভা',
        image: 'village waz mahfil.jpg',
        publishDate: new Date(),
      }
    ];

    for (const item of newsItems) {
      const news = await prisma.newsUpdate.create({
        data: item,
      });
      console.log(`Created news: ${news.title}`);
    }
    console.log('Seeding finished.');
  } catch (e) {
    console.error('Error during seeding:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
