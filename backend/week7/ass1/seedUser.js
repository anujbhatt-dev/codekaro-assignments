require("./db");
const User = require("./models/user.model");

const firstNames = ["Anuj", "Aman", "Aadi", "Akky", "Shivam"];
const lastNames = ["Bhatt", "Rawat", "Kotiyal", "Thapliyal", "Bharti"];
const cities = ["Dehradun", "Pune", "Bangalore", "Mumbai", "Delhi"];

const count = Number(process.argv[2]) || 1;
const batchSize = 1000;

const randomNumber = (max) => Math.floor(Math.random() * max);

const randomFirstName = () => firstNames[randomNumber(firstNames.length)];
const randomLastName = () => lastNames[randomNumber(lastNames.length)];
const randomCity = () => cities[randomNumber(cities.length)];

const randomGender = () => Math.random() < 0.5 ? "male" : "female";

const getRandomUser = () => {
    const firstName = randomFirstName();
    const lastName = randomLastName();

    return {
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Date.now()}${Math.random().toString(36).slice(2, 7)}@gmail.com`,
        gender: randomGender(),
        city: randomCity(),
    };
};

const seedUsers = async () => {
    const startTime = Date.now();
    let insertedCount = 0;

    try {
        console.log("\n========== USER SEEDING STARTED ==========");
        console.log(`Total users to create: ${count}`);
        console.log(`Batch size: ${batchSize}\n`);

        for (let i = 0; i < count; i += batchSize) {
            const currentBatchSize = Math.min(batchSize, count - i);

            const users = Array.from(
                { length: currentBatchSize },
                () => getRandomUser()
            );

            const result = await User.insertMany(users);

            insertedCount += result.length;

            const progress = ((insertedCount / count) * 100).toFixed(2);

            console.log(
                `Progress: ${progress}% | Inserted: ${insertedCount}/${count}`
            );
        }

        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log("\n========== SEEDING COMPLETED ==========");
        console.log(`Total inserted: ${insertedCount}`);
        console.log(`Time taken: ${totalTime} seconds`);

    } catch (error) {
        console.error("\nSeeding failed:", error);
        console.log(`Successfully inserted before failure: ${insertedCount}`);
    } finally {
        await User.db.close();
    }
};

seedUsers();