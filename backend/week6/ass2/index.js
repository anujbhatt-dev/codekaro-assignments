const express = require("express")
const app = express();
const {z} = require("zod")
app.use(express.json());

const postValidation = z.strictObject({
    caption: z.string().max(2200).optional(),
    images: z.array(z.url()).min(1).max(10),
    visibility: z.enum(["public", "followers", "private"]).default("private"),
    location: z.string().max(100).optional(),
    tags: z.array(z.string().min(1).max(30))
        .max(30)
        .refine(tags => new Set(tags).size === tags.length, {
            message: "Duplicate tags are not allowed"
        })
        .optional()
}).refine(data => data.caption !== undefined || data.images.length > 0, {
    message: "At least one of caption or images must be provided",
    path: ["caption"]
});

const videoValidation = z.strictObject({
    title:z.string().min(5).max(100),
    description:z.string().max(5000).optional(),
    category: z.enum(["education","gaming","music","entertainment","technology"]),
    visibility: z.enum(["public", "followers", "private"]).default("private"),
    tags:z.array(z.string().min(2).max(30)).max(15),
    ageRestricted:z.boolean().default(false)
})

const preferenceValidation = z.strictObject({
    language: z.enum(["en", "hi", "es", "fr", "de", "ja"]).optional(),
    quality: z.enum(["auto", "low", "medium", "high"]).optional(),
    autoplay: z.boolean().optional(),
    subtitle: z.boolean().optional(),
    maturityLevel: z.enum(["kids", "teen", "adult"]).optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
});

const jobValidation = z.strictObject({
    title: z.string().min(3).max(100),
    company: z.string().min(2).max(100),
    description: z.string().min(50).max(5000),
    location: z.string().min(2).max(100),
    workMode: z.enum(["remote", "hybrid", "onsite"]),
    employmentType: z.enum(["full-time", "part-time", "internship", "contract"]),
    salary: z.strictObject({
        min: z.number().positive(),
        max: z.number().positive(),
        currency: z.enum(["INR", "USD", "EUR"])
    }).refine(data => data.max >= data.min, {
        message: "Max cannot be less than min",
        path: ["max"]
    }),
    skills: z.array(z.string().min(2).max(50)).min(1).max(20)
        .refine(skills => new Set(skills).size === skills.length, {
            message: "Duplicate skills are not allowed"
        })
});



app.post("/api/posts", async (req, res) => {
    try {
        const result = postValidation.safeParse(req.body);
        if (!result.success) return res.status(400).json({ errors: result.error.issues });
        res.status(201).json({ message: "Post created successfully", data: result.data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/videos", async (req, res) => {
    try {
        const result = videoValidation.safeParse(req.body);
        if (!result.success) return res.status(400).json({ errors: result.error.issues });
        res.status(201).json({ message: "Video created successfully", data: result.data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.patch("/api/users/preferences", async (req, res) => {
    try {
        const result = preferenceValidation.safeParse(req.body);
        if (!result.success) return res.status(400).json({ errors: result.error.issues });
        res.status(200).json({ message: "Preferences updated successfully", data: result.data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/jobs", async (req, res) => {
    try {
        const result = jobValidation.safeParse(req.body);
        if (!result.success) return res.status(400).json({ errors: result.error.issues });
        res.status(201).json({ message: "Job created successfully", data: result.data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen("8000",()=>{
    console.log("app running on port 8000");
    
})