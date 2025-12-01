"use client";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { CreateWorkspaceForm } from "./CreateWorkspaceForm";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => { 
    const {isOpen,setIsOpen,close} = useCreateWorkspaceModal()
    return (
        <ResponsiveModal isOpen={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close}/>
        </ResponsiveModal>
    )
}