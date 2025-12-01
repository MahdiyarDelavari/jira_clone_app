"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import React from "react";
import { RiAddCircleLine } from "react-icons/ri";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectItem,
} from "./ui/select";
import WorkspaceAvatar from "@/features/workspaces/components/WorkspaceAvatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

const WorkspacesSwitcher = () => {
    const workspaceId = useWorkspaceId();

    const router = useRouter();
    const { data: workspaces } = useGetWorkspaces();
    const { open } = useCreateWorkspaceModal();
    
    const onSelect = (id: string) => { 
        router.push(`/workspaces/${id}`);
    }
    

	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between ">
				<p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleLine
                    onClick={open}
					size={20}
					className="size-5 text-neutral-600 hover:opacity-75 transition cursor-pointer"
				/>
            </div>
            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1.5">
                    <SelectValue placeholder="No Workspace Selected"/>
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                            <div className="flex justify-start items-center gap-3 font-medium">
                                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                <span className="truncate">{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
		</div>
	);
};

export default WorkspacesSwitcher;
