import { useRouter } from 'next/router';
import WithNavbar from '../../components/WithNavbar';

export default function TreatmentDetail() {
    const router = useRouter();
    return (
        <WithNavbar>
            {router.query.id}
        </WithNavbar>
    );
};