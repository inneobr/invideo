import MobileNav from "./Mobile";
import Link from "next/link";
import Nav from "./Nav";

const Header = () => {
    return (
        <header className="header">
            <div className="navbar">
                <Link href="/">
                    <h1 className="logo">
                        IN<span className="logo-span">VIDEO</span>
                    </h1>
                </Link>

                <div className="navbar-desktop">
                    <Nav />
                </div>

                <div className="xl:hidden">
                   <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header;