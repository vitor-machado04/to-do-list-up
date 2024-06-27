import { BiTask } from "react-icons/bi"

function footer() {
    return (
        <footer className="footer justify-center items-center p-4 text-neutral-content">
            <aside className="items-center grid-flow-col">
                <BiTask size={50} />
                <p>Copyright © 2024 - Choquei universitario </p>
            </aside>
        </footer>
    )
}

export default footer