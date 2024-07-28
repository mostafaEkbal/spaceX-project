import {
    GetLauncheDocument,
    GetLauncheQuery,
    GetLauncheQueryVariables
} from '@/gql/graphql';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '@/lib/apolloClient';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

type LuanchPageProps = {
    launch: GetLauncheQuery['launch'];
};

const Launch: React.FC<LuanchPageProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { isReady, query } = router;
    const { launchId } = query as { launchId: string };

    const { data, loading, error } = useQuery(GetLauncheDocument, {
        variables: { id: launchId, isOpen: isOpen }
    });

    if (!isReady) {
        return <p>loading</p>;
    }
    if (loading) {
        return <p>loading</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    const { launch } = data as GetLauncheQuery;

    // if (router.isFallback) {
    //     return <p>Loading...</p>;
    // }
    return (
        <div>
            <li key={launch?.mission_name} className={styles.listItem}>
                <h2 className={styles.missionName}>{launch?.mission_name}</h2>
                <h3>{launch?.id}</h3>
                <p className={styles.launchDate}>{launch?.launch_date_local}</p>
                <p className={styles.launchSite}>{launch?.launch_success}</p>
                <p className={styles.rocketName}>{launch?.upcoming}</p>
                <p className={styles.rocketName}>{launch?.details}</p>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleTrigger
                        style={{
                            padding: 10,
                            border: 'none'
                        }}
                    >
                        see more
                    </CollapsibleTrigger>
                    <CollapsibleContent style={{ marginTop: 20 }}>
                        <a href={launch?.links?.video_link ?? ''}>
                            {launch?.links?.video_link
                                ? 'Launch Video Link'
                                : ''}
                        </a>
                    </CollapsibleContent>
                </Collapsible>
            </li>
        </div>
    );
};

export default Launch;

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: true
//     };
// };

// export const getStaticProps: GetStaticProps<LuanchPageProps> = async ({
//     params
// }) => {
//     const id = params?.launchId;

//     if (typeof id !== 'string') {
//         return {
//             notFound: true
//         };
//     }

//     try {
//         const { data } = await client.query<
//             GetLauncheQuery,
//             GetLauncheQueryVariables
//         >({
//             query: GetLauncheDocument,
//             variables: { id }
//         });

//         return {
//             props: {
//                 launch: data.launch
//             },
//             revalidate: 60 // Re-generate the page every 60 seconds
//         };
//     } catch (error) {
//         console.error('Error fetching Pokemon:', error);
//         return {
//             notFound: true
//         };
//     }
// };
