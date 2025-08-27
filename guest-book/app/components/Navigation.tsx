import { Button } from "~/components/ui/button";
import { BookOpen, PenTool } from "lucide-react";
import { Link, useLocation } from "react-router";

export const Navigation = () => {
	const location = useLocation();

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-border">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<BookOpen className="h-6 w-6 text-primary" />
						<h1 className="text-xl font-semibold text-foreground">
							Guest Book
						</h1>
					</div>

					<div className="flex items-center space-x-2">
						<Button
							variant={
								location.pathname === "/" ? "default" : "ghost"
							}
							size="sm"
							asChild
							className="transition-all duration-300"
						>
							<Link
								to="/"
								className="flex items-center space-x-2"
							>
								<BookOpen className="h-4 w-4" />
								<span>Messages</span>
							</Link>
						</Button>

						<Button
							variant={
								location.pathname === "/sign"
									? "default"
									: "ghost"
							}
							size="sm"
							asChild
							className="transition-all duration-300"
						>
							<Link
								to="/sign"
								className="flex items-center space-x-2"
							>
								<PenTool className="h-4 w-4" />
								<span>Sign</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};
