import dynamic from 'next/dynamic';
import { withAuth } from '@backend/middleware/withAuth';
const Index = dynamic(() => import('@container/index'));

export default function Home() {
  return <Index />;
}

export const getServerSideProps = withAuth((context) => {
  return { props: {} };
});
