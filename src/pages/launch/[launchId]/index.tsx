import {
    GetLauncheDocument,
    GetLauncheQuery,
    GetLauncheQueryVariables
} from '@/gql/graphql';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '@/styles/Home.module.css';

const Launch = () => {
    const router = useRouter();
    const { query } = router;
    const { launchId } = query as { launchId: string };

    const { data, error, loading } = useQuery<
        GetLauncheQuery,
        GetLauncheQueryVariables
    >(GetLauncheDocument, {
        variables: { id: launchId },
        skip: !launchId
    });

    // Handle the case when the route is not yet available
    if (!launchId) {
        return <p>Loading...</p>;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { launch } = data as GetLauncheQuery;

    return (
        <div>
            <li
                key={launch?.mission_name}
                className={styles.listItem}
                style={{ cursor: 'pointer' }}
            >
                <h2 className={styles.missionName}>{launch?.mission_name}</h2>
                <p className={styles.launchDate}>{launch?.launch_date_local}</p>
                <p className={styles.launchSite}>
                    {launch?.launch_site?.site_name_long}
                </p>
                <p className={styles.rocketName}>
                    {launch?.rocket?.rocket_name}
                </p>
                <p className={styles.rocketName}>{launch?.details}</p>
            </li>
        </div>
    );
};

export default Launch;
