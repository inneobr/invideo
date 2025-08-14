'use client';


import Link from "next/link";
import { IoMenu }from "react-icons/io5"
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"; 

const rotas =[
    {
        name: "Explorar",
        path: "/"
    },
]

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger className="flex justify-center items-center">
                <IoMenu className="text-[32px] text-amber-600"/>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <div className="mt-20 mb-40 text-center text-2xl text-white">
                    <Link href="/">
                        <h2 className="text-4xl font-semibold">
                            IN<span className="text-amber-600">VIDEO</span>
                        </h2>
                    </Link>
                </div>
               <nav className="flex flex-col justify-center items-center gap-8">
                    {rotas.map((link, index) => {
                        return <Link key={index} href={link.path} className={`${link.path === pathname && "text-amber-600"} text-white text-xl uppercase hover:text-amber-600 transition-all`}>
                            {link.name}
                        </Link>
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
export default MobileNav