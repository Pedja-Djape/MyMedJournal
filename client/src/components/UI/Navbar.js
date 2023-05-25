import { Link, useResolvedPath, useMatch } from "react-router-dom";

const CustomLink= ({to, children, ...props}) => {
    // make sure path is the full relative path
    const resolvedPath = useResolvedPath(to);
    // 
    const isActive = useMatch({
        path: resolvedPath.pathname,
        end: true
    });
    return (
        <li className={`hover:bg-[#777] ${isActive ? "b#555]" : ""}`}  >
            <Link className="text-inherit no-underline h-full flex items-center p-1" to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

const Navbar = (props) => {
    // Iterate over page Obkect
    const pages = Object.keys(props.pages).map( 
        (pageRoute) => {
            return <CustomLink key={pageRoute} to={pageRoute}>{props.pages[pageRoute]}</CustomLink>
    });

    return (
        <div className="box-border">
            <nav className="fixed w-full top-0 left-0 py-4 z-50 bg-[#333] text-white flex justify-between items-stretch ">
                <Link to="/" className="text-2xl">
                    MedSearchViz
                </Link>
                <ul className="p-0 m-0 list-none flex gap-4">
                    {pages}
                </ul>
            </nav>
        </div>
        
    );
}


export default Navbar;
