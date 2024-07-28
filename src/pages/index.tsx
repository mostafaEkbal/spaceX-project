import { useQuery } from '@apollo/client';
import {
    GetLaunchesDocument,
    GetLaunchesQuery,
    GetLaunchesQueryVariables
} from '@/gql/graphql';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

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
                    <Link
                        key={launch?.mission_name}
                        href={`launch/${launch?.id}`}
                    >
                        <li
                            className={styles.listItem}
                            style={{ cursor: 'pointer' }}
                        >
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
                            <p className={styles.rocketName}>
                                {launch?.details}
                            </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Home;
