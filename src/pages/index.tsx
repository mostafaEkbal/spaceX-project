import { gql, useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import {
    GetLaunchesDocument,
    GetLaunchesQuery,
    GetLaunchesQueryVariables
} from '@/gql/graphql';
import styles from '../styles/Home.module.css';

const LAUNCHES_QUERY = gql`
    query GetLaunches($limit: Int!) {
        launchesPast(limit: $limit) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            rocket {
                rocket_name
            }
            launch_success
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery<
        GetLaunchesQuery,
        GetLaunchesQueryVariables
    >(GetLaunchesDocument, {
        variables: { limit: 10 }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SpaceX Launches</h1>
            <ul className={styles.list}>
                {data?.launchesPast?.map((launch) => (
                    <li key={launch?.mission_name} className={styles.listItem}>
                        <h2 className={styles.missionName}>
                            {launch?.mission_name}
                        </h2>
                        <p className={styles.launchDate}>
                            {launch?.launch_date_local}
                        </p>
                        <p className={styles.launchSite}>
                            {launch?.launch_site?.site_name_long}
                        </p>
                        <p className={styles.rocketName}>
                            {launch?.rocket?.rocket_name}
                        </p>
                        <p className={styles.rocketName}>{launch?.details}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
