import { withAuth } from '@backend/middleware/withAuth';
import Index from '@container/index';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [theChatter, setTheChatter] = useRecoilState(theOtherUser);

  return <Index />;
}

export const getServerSideProps = withAuth((context) => {
  return { props: {} };
});
