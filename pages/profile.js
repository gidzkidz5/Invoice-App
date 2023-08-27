import UserProfile from "@/components/profile/UserProfile";
import { getSession } from "next-auth/react";

export default function ProfilePage() {
    return <UserProfile/>
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});
    console.log(session)

    if (!session) {
       
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}