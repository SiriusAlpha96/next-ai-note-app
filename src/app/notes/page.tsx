import Note from "@/components/Note"
import prisma from "@/lib/db/prisma"
import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"


export const metadata: Metadata ={
    title:"FlowBrain - Notes",
}

export default async function NotesPage(){
    const {userId} = auth()

    if(!userId) throw Error("userId undefined")

    const allNotes = await prisma.note.findMany({where: {userId}})

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
             {allNotes.map((note)=>( 
                 <Note note={note} key={note.id} /> 
             )) 
             } 
            {allNotes.length === 0 && ( 
                <div className="col-span-full text-center">
                    {"You don't have any notes yet. Why don't you create one?"}
                </div>
            )} 
        </div>
    )
}


// import Note from "@/components/Note"
// import prisma from "@/lib/db/prisma"
// import { auth } from "@clerk/nextjs/server"
// import { Metadata } from "next"
// // import { useRouter } from "next/router"

// export const metadata: Metadata = {
//     title: "FlowBrain - Notes",
// }

// export default async function NotesPage() {
//     const { userId } = auth()
//     // const router = useRouter()

//     if (!userId) {
//         // You can either redirect the user to the login page
//         // router.push('/login') // Uncomment this line to redirect
//         // or return a message
//         return (
//             <div className="text-center">
//                 {"You need to be logged in to view your notes."}
//             </div>
//         )
//     }

//     const allNotes = await prisma.note.findMany({ where: { userId } })

//     return (
//         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {allNotes.map((note) => (
//                 <Note note={note} key={note.id} />
//             ))}
//             {allNotes.length === 0 && (
//                 <div className="col-span-full text-center">
//                     {"You don't have any notes yet. Why don't you create one?"}
//                 </div>
//             )}
//         </div>
//     )
// }
