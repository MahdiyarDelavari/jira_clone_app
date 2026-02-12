"use client";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle ,CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-invite-code";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps { 
    initialValues: {
        name: string;
    }
}

export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
    const workspaceId = useWorkspaceId()
    const inviteCode = useInviteCode();
    const { mutate ,isPending} = useJoinWorkspace();
    const router = useRouter()

    const onSubmit = () => { 
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({data}) => {                
                router.push(`/${data.id}`);
                
            }   
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">Join a workspace</CardTitle>
                <CardDescription>
                    You have been invited to join <strong>{initialValues.name}</strong> Workspace
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <div className="flex gap-2 flex-col lg:flex-row items-center justify-between">
                    <Button className="w-full lg:w-fit" variant={"secondary"} size={"lg"} type="button" asChild  disabled={isPending}>
                        <Link href={"/"} >
                            Cancel
                        </Link>
                    </Button>
                    <Button className="w-full lg:w-fit" size={"lg"} type="button" onClick={onSubmit} disabled={isPending}>
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}