"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateWorkspaceSchema } from "../schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";

interface EditWorkspaceFormProps {
	onCancel?: () => void;
	initialValues: Workspace;
}

export const EditWorkspaceForm = ({
	onCancel,
	initialValues,
}: EditWorkspaceFormProps) => {
	const router = useRouter();
	const { mutate, isPending } = useUpdateWorkspace();
	const {mutate: deleteWorkspace , isPending: isDeleting} = useDeleteWorkspace();

	const [Delete, DeleteConfirmationDialog] = useConfirm(
		"Delete Workspace",
		"Are you sure you want to delete this workspace?",
		"destructive"
	);

	const inputRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
		resolver: zodResolver(updateWorkspaceSchema),
		defaultValues: {
			...initialValues,
			image: initialValues.imageUrl || "",
		},
	});

	const handleDelete = async () => {
		const ok = await Delete();

		if (!ok) return;
		deleteWorkspace(
			{
				param: { workspaceId: initialValues.$id },
			},
			{
				onSuccess: () => {
					window.location.href = "/";
				},
			}
		);
	}

	const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
		const finalValues = {
			...values,
			image: values.image instanceof File ? values.image : "undefined",
		};
		mutate(
			{
				form: finalValues,
				param: { workspaceId: initialValues.$id },
			},
			{
				onSuccess: ({ data }) => {
					form.reset();
					router.push(`/workspaces/${data.$id}`); // Redirect to new workspace
				},
			}
		);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			form.setValue("image", file);
		}
	};

	return (
		<div className="flex flex-col gap-y-4">
			<DeleteConfirmationDialog />
			<Card className="w-full h-full border-none shadow-none">
				<CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
					<Button
						className="flex items-center justify-center"
						size="sm"
						variant="secondary"
						onClick={onCancel ? onCancel : () => router.back()}
					>
						<ArrowLeft className="mr-2 size-4" />
						Back
					</Button>
					<CardTitle className="text-xl font-bold">
						{`Edit Workspace: ${initialValues.name}`}
					</CardTitle>
				</CardHeader>

				<div className="px-7">
					<DottedSeparator />
				</div>

				<CardContent className="p-7">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-y-4 ">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Workspace Name</FormLabel>
											<FormControl>
												<Input
													className=""
													placeholder="My Workspace"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="image"
									render={({ field }) => (
										<div className="flex flex-col gap-y-2">
											<div className="flex items-center gap-x-5">
												{field.value ? (
													<div className="size-[72px] relative rounded-md overflow-hidden">
														<Image
															src={
																field.value instanceof File
																	? URL.createObjectURL(field.value)
																	: field.value
															}
															fill
															className="object-cover"
															alt="avatar"
														/>
													</div>
												) : (
													<Avatar className="size-[72px]">
														<AvatarFallback className="">
															<ImageIcon className="size-[36px] text-neutral-400 " />
														</AvatarFallback>
													</Avatar>
												)}
												<div className="flex flex-col">
													<p className="text-sm">Workspace Icon</p>
													<p className="text-sm text-muted-foreground">
														JPG, PNG, SVG Or JPEG, Max 10 MB
													</p>
													<input
														className="hidden"
														type="file"
														accept=".jpg, .png, .jpeg, .svg"
														ref={inputRef}
														disabled={isPending}
														onChange={handleImageChange}
														title="Upload workspace icon"
														placeholder="Choose an image file"
													/>
													{field.value ? (
														<Button
															type="button"
															size="xs"
															variant="destructive"
															onClick={() => {
																field.onChange(null);
																if (inputRef.current) {
																	inputRef.current.value = "";
																}
															}}
															className="w-fit mt-2"
														>
															Upload Image
														</Button>
													) : (
														<Button
															type="button"
															size="xs"
															variant="teritary"
															onClick={() => inputRef.current?.click()}
															className="w-fit mt-2"
														>
															Upload Image
														</Button>
													)}
												</div>
											</div>
										</div>
									)}
								/>
							</div>
							<DottedSeparator className="py-7" />
							<div className="flex items-center justify-between">
								<Button
									type="button"
									size="lg"
									variant="secondary"
									onClick={onCancel}
									disabled={isPending}
									className={cn(!onCancel && "invisible")}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									size="lg"
									variant="primary"
									disabled={isPending}
								>
									Save Changes
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			<Card className="w-full h-full border-none shadow-none">
				<CardContent className="p-7">
					<div className="flex flex-col">
						<h3 className="font-bold">Danger Zone</h3>
						<p className="text-sm text-muted-foreground">
							Deleting a workspace is irreversible. Please proceed with caution.
						</p>
						<Button
							className="mt-6 w-fit ml-auto"
							size={"sm"}
							variant={"destructive"}
							disabled={isPending || isDeleting}
							onClick={handleDelete}
						>
							Delete Workspace
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
