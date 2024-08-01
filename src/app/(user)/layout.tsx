import { ReactNode } from "react";

interface UserLayoutProps {
	children: ReactNode
}

export default async function UserLayout({ children }: UserLayoutProps){
	return <>{children}</>
}