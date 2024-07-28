import {
    GetLauncheDocument,
    GetLauncheQuery,
    GetLauncheQueryVariables
} from '@/gql/graphql';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '@/lib/apolloClient';

type LuanchPageProps = {
    launch: GetLauncheQuery['launch'];
};

const Launch: React.FC<LuanchPageProps> = ({ launch }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <li key={launch?.mission_name} className={styles.listItem}>
                <a href={launch?.links?.video_link ?? ''}>Video Link</a>
                <h2 className={styles.missionName}>{launch?.mission_name}</h2>
                <p className={styles.launchDate}>{launch?.launch_date_local}</p>
                <p className={styles.launchSite}>{launch?.launch_success}</p>
                <p className={styles.rocketName}>{launch?.upcoming}</p>
                <p className={styles.rocketName}>{launch?.details}</p>
            </li>
        </div>
    );
};

export default Launch;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<LuanchPageProps> = async ({
    params
}) => {
    const id = params?.launchId;

    if (typeof id !== 'string') {
        return {
            notFound: true
        };
    }

    try {
        const { data } = await client.query<
            GetLauncheQuery,
            GetLauncheQueryVariables
        >({
            query: GetLauncheDocument,
            variables: { id }
        });

        return {
            props: {
                launch: data.launch
            },
            revalidate: 60 // Re-generate the page every 60 seconds
        };
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        return {
            notFound: true
        };
    }
};
