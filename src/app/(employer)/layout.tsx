import { ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps){
	return <>{children}</>
}