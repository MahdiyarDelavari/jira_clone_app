import { ResponsiveModal } from "@/components/ResponsiveModal";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const useConfirm = (
	title: string,
	message: string,
	variant: ButtonProps["variant"] = "primary"
) :[() => Promise<unknown>, () => JSX.Element] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({resolve})
        })
    }

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }
    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const ConfirmationDialog = () => (
        <ResponsiveModal isOpen={promise !== null} onOpenChange={handleClose} >
            <Card>
                <CardContent className="pt-8">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>
                    <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                        <Button variant="outline" className="w-full lg:w-auto" onClick={handleCancel}>Cancel</Button>
                        <Button variant={variant} className="w-full lg:w-auto" onClick={handleConfirm}>Confirm</Button>
                    </div>
                </CardContent>
            </Card>
        </ResponsiveModal>
    )
    return [confirm, ConfirmationDialog];
};
