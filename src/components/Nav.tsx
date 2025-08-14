'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const rotas =[
    {
        name: "Explorar",
        path: "/"
    },
    {
        name: "Histórico",
        path: "/historico"
    },
]

const Nav = () => {
    const pathname = usePathname();
    return (
       <nav className="nav-menu">
        {rotas.map((link, index) => {
            return <Link key={index} href={link.path} className={`${link.path === pathname && "text-amber-600 border-b-2 transition-all"}`}>
                {link.name}
            </Link>
        })}
       </nav>
    )
}
export default Nav