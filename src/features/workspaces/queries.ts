"use server";

import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
	try {
		const { databases: db, account } = await createSessionClient();
		const user = await account.get();

		const members = await db.listDocuments(DATABASE_ID, MEMBERS_ID, [
			Query.equal("userId", [user.$id]),
		]);
		if (members.total === 0) {
			return { documents: [], total: 0 };
		}

		const workspaceIds = members.documents.map((member) => member.workspaceId);

		const workspaces = await db.listDocuments(DATABASE_ID, WORKSPACES_ID, [
			Query.orderDesc("$createdAt"),
			Query.contains("$id", workspaceIds),
		]);

		return workspaces;
	} catch {
		return { documents: [], total: 0 };
	}
};

interface GetWorkspaceProps {
	WorkspaceId: string;
}

export const getWorkspace = async ({ WorkspaceId }: GetWorkspaceProps) => {
	try {
		const { databases: db, account } = await createSessionClient();
		const user = await account.get();
		const member = await getMember({
			databases: db,
			userId: user.$id,
			workspaceId: WorkspaceId,
		});
		if (!member) {
			return null;
		}

		const workspace = await db.getDocument<Workspace>(
			DATABASE_ID,
			WORKSPACES_ID,
			WorkspaceId
		);

		return workspace;
	} catch {
		return null;
	}
};
