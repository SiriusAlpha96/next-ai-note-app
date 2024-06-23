"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import AddNoteDialog from "@/components/AddEditNoteDialog"
import ThemeToggleButton from "@/components/ThemeToggleButton"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export default function NavBar() {
    const {theme} = useTheme()
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)

    return(
    <>
    <div className="p-5 shadow">
        <div className="max-auto flex max-w-7xl flex-wrap gap-4 items-center justify-between">
            <Link 
            href="/notes"
            className="flex items-center gap-1">
                <Image 
                src={logo}
                alt="FlowBrain logo"
                width={40}
                height={40}/>
                <span className="font-bold">FlowBrain</span>
            </Link>
            <div className="flex items-center gap-2">
                <UserButton afterSignOutUrl="/" 
                appearance={{
                    baseTheme: (theme ==="dark" ? dark :undefined),
                    elements: {avatarBox: {width: "2.5rem", height: "2.5rem"}},
                }}
                />
                <ThemeToggleButton />
                <Button onClick={()=> setShowAddNoteDialog(true)}>
                    <Plus size={20} className="mr-2" />
                    Add Note
                </Button>
            </div>
        </div>
    </div>
    <AddNoteDialog open={showAddNoteDialog} setOpen={setShowAddNoteDialog} />
    </>
    )
}