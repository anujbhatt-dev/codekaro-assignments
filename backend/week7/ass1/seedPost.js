require("./db");
const User = require("./models/user.model");
const Post = require("./models/post.model");

const captions = [
    "Enjoying the little things in life.",
    "Making memories that last forever.",
    "Life is better when you're smiling.",
    "Another day, another adventure.",
    "Chasing dreams and creating memories.",
    "Good vibes only.",
    "Collect moments, not things.",
    "Living life one day at a time.",
    "Stay focused and keep growing.",
    "Finding beauty in everyday moments.",
];

const images = [
    "https://picsum.photos/seed/1/800/600",
    "https://picsum.photos/seed/2/800/600",
    "https://picsum.photos/seed/3/800/600",
    "https://picsum.photos/seed/4/800/600",
    "https://picsum.photos/seed/5/800/600",
    "https://picsum.photos/seed/6/800/600",
    "https://picsum.photos/seed/7/800/600",
    "https://picsum.photos/seed/8/800/600",
    "https://picsum.photos/seed/9/800/600",
    "https://picsum.photos/seed/10/800/600",
];

const count = Math.max(500, Number(process.argv[2]) || 500);
const batchSize = 1000;

const randomNumber = (max) => Math.floor(Math.random() * max);

const randomCaption = () => captions[randomNumber(captions.length)];
const randomImage = () => images[randomNumber(images.length)];

const getRandomPost = (users) => {
    return {
        userId: users[randomNumber(users.length)]._id,
        caption: randomCaption(),
        imageUrl: randomImage(),
    };
};

const seedPosts = async () => {
    const startTime = Date.now();
    let insertedCount = 0;

    try {
        console.log("\n========== POST SEEDING STARTED ==========");

        const users = await User.find().select("_id");

        if (users.length === 0) {
            throw new Error("No users found. Seed users first!");
        }

        console.log(`Users found: ${users.length}`);
        console.log(`Posts to create: ${count}`);
        console.log(`Batch size: ${batchSize}\n`);

        for (let i = 0; i < count; i += batchSize) {
            const currentBatchSize = Math.min(batchSize, count - i);

            const posts = Array.from(
                { length: currentBatchSize },
                () => getRandomPost(users)
            );

            const result = await Post.insertMany(posts);

            insertedCount += result.length;

            const progress = ((insertedCount / count) * 100).toFixed(2);

            console.log(
                `Progress: ${progress}% | Inserted: ${insertedCount}/${count}`
            );
        }

        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log("\n========== SEEDING COMPLETED ==========");
        console.log(`Total posts inserted: ${insertedCount}`);
        console.log(`Time taken: ${totalTime} seconds`);

    } catch (error) {
        console.error("\nPost seeding failed:", error);
        console.log(`Successfully inserted: ${insertedCount}`);

    } finally {
        await User.db.close();
    }
};

seedPosts();