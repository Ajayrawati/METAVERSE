const { Router } = require("express");
const userRoutes = require("./user");
const spaceRoutes = require("./space");
const adminRoutes = require("./admin");
const client = require("../ZZDataBase/index");
const { signupSchema, signinSchema } = require("../utils/schema");
const bcrypt = require("bcrypt");

const route = Router();

// Signup route
route.post('/signup', async (req, res) => {
    console.log(req.body);
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Validation Failed", errors: parsedData.error.errors });
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10); // Hash the password
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword, // Store hashed password
                role: parsedData.data.type === "admin" ? "ADMIN" : "USER",
            },
        });
        res.json({
            userId: user.id,
            message: "Signup successful",
            user,
        });
    } catch (e) {
        console.error("Error during signup:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign-in route
route.post('/signin', async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Validation Failed", errors: parsedData.error.errors });
    }

    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            userId: user.id,
            message: "Sign-in successful",
            user: { username: user.username, role: user.role }, // Send non-sensitive user info
        });
    } catch (e) {
        console.error("Error during sign-in:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Example placeholder routes
route.get('/signup', (req, res) => res.send("This is SignUP"));
route.get('/elements', (req, res) => res.json({ message: "Get elements" }));
route.get('/avatars', (req, res) => res.json({ message: "Get avatars" }));

// Mount sub-routers
route.use("/user", userRoutes);
route.use("/space", spaceRoutes);
route.use("/admin", adminRoutes);

module.exports = route;
