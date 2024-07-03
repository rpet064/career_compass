import { useRouter } from 'next/router';

export default function ManageResume(){
    const router = useRouter();
    const { id } = router.query;
    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <p>ID: {id}</p>
    );
}