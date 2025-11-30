import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middlewate";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono().post(
	"/",
	zValidator("json", createWorkspaceSchema),
	sessionMiddleware,
	async (c) => {
		const db = c.get("databases");
		const user = c.get("user");

		const { name } = c.req.valid("json");

		const workspace = await db.createDocument(
			DATABASE_ID,
			WORKSPACES_ID,
			ID.unique(),
			{
                name,
                userId: user.$id,
			}
		);

		return c.json({ data: workspace });
	}
);

export default app;
