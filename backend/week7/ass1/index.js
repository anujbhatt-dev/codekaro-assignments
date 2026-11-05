require("./db");
const express = require("express");
const User = require("./models/user.model");
const Post = require("./models/post.model");

const app = express();
app.use(express.json());

// Part A: Offset-Based Pagination
app.get("/api/users", async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Number(req.query.limit) || 10);
        const skip = (page - 1) * limit;

        const [users, totalUsers] = await Promise.all([
            User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments()
        ]);

        res.json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            hasNextPage: page < Math.ceil(totalUsers / limit),
            hasPrevPage: page > 1
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Part B: Cursor-Based Pagination
app.get("/api/posts", async (req, res) => {
    try {
        const limit = Math.max(1, Number(req.query.limit) || 10);
        const cursor = req.query.cursor;

        if (cursor && !/^[a-f\d]{24}$/i.test(cursor)) {
            return res.status(400).json({ error: "Invalid cursor" });
        }

        const query = cursor ? { _id: { $lt: cursor } } : {};

        const posts = await Post.find(query)
            .sort({ _id: -1 })
            .limit(limit + 1)
            .populate("userId", "name email");

        const hasMore = posts.length > limit;
        if (hasMore) posts.pop();

        res.json({
            posts,
            nextCursor: hasMore ? posts[posts.length - 1]._id : null,
            hasMore
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));