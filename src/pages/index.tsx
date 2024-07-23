import { gql, useQuery } from '@apollo/client';
import client from '../lib/apolloClient';

const LAUNCHES_QUERY = gql`
    query GetLaunches {
        launchesPast(limit: 5) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            rocket {
                rocket_name
            }
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>SpaceX Launches</h1>
            <ul>
                {data.launchesPast.map((launch: any) => (
                    <li key={launch.mission_name}>
                        <h2>{launch.mission_name}</h2>
                        <p>{launch.launch_date_local}</p>
                        <p>{launch.launch_site.site_name_long}</p>
                        <p>{launch.rocket.rocket_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
