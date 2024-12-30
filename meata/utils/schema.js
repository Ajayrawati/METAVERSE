const { z } = require("zod");

const signupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    type: z.enum(["admin", "user"]),
});

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8),
});

const updateMetaverseSchema = z.object({
    avatarID: z.string(),
});

const createSpaceSchema = z.object({
    name: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    mapId: z.string(),
});

const addElementSchema = z.object({
    spaceId: z.string(),
    elementId: z.string(),
    x: z.number(),
    y: z.number(),
});

const createElementSchema = z.object({
    imageUrl: z.string(),
    width: z.number(),
    height: z.number(),
    static: z.boolean(),
});

const updateElementSchema = z.object({
    imageUrl: z.string(),
});

const createAvatarSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
});

const createMapSchema = z.object({
    thumbnail: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    defaultElements: z.array(
        z.object({
            elementId: z.string(),
            x: z.number(),
            y: z.number(),
        })
    ),
});

// Export all schemas
module.exports = {
    signupSchema,
    signinSchema,
    updateMetaverseSchema,
    createSpaceSchema,
    addElementSchema,
    createElementSchema,
    updateElementSchema,
    createAvatarSchema,
    createMapSchema,
};
