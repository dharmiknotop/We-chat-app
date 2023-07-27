import { withAuth } from '@backend/middleware/withAuth';
import Index from '@container/index';

export default function Home() {
  return <Index />;
}

export const getServerSideProps = withAuth((context) => {
  return { props: {} };
});
