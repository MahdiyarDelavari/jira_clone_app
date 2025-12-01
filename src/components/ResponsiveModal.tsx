import { useMedia } from "react-use";

import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

interface ResponsiveModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}
export const ResponsiveModal = ({
	children,
	isOpen,
	onOpenChange,
}: ResponsiveModalProps) => {
	const isDesktop = useMedia("(min-width: 1024px)", true);
	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-lg w-full border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
					{children}
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer open={isOpen} onOpenChange={onOpenChange}>
			<DrawerContent>
				<div className="max-h-[85vh] overflow-y-auto hide-scrollbar">
					{children}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
