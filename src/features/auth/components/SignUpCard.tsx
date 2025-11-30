"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "../schemas";
import { useRegister } from "../api/use-register";


export const SignUpCard = () => {

	const {mutate,isPending} = useRegister()



	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		mutate({json:values})
	};

	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none ">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					By Signing Up, You Agree To Our{" "}
					<Link href={"/privacy"}>
						<span className="text-blue-700">Privacy Policy</span>
					</Link>{" "}
					and{" "}
					<Link href={"/terms"}>
						<span className="text-blue-700">Terms Of Service</span>
					</Link>{" "}
				</CardDescription>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="text"
											placeholder="Enter Your Name"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="Enter Email Address"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="Enter Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						
						<Button disabled={isPending} size={"lg"} className="w-full">
							Register
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="flex gap-4 p-7">
				<Button
					variant={"secondary"}
					disabled={isPending}
					size={"lg"}
					className="w-6/12"
				>
					<FcGoogle className="mr-2 size-5" />
					Google
				</Button>
				<Button
					variant={"secondary"}
					disabled={isPending}
					size={"lg"}
					className="w-6/12"
				>
					<FaGithub className="mr-2 size-5" />
					Github
				</Button>
			</CardContent>
			<div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="flex items-center justify-center p-7">
                <p>
                    Already Have An Account?
                    <Link href={"/sign-in"}>
                        <span className="text-blue-700">{" "}Sign In</span>
                    </Link>
                </p>
            </CardContent>
		</Card>
	);
};
