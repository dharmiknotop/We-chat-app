import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { withAuth } from '../middleware/withAuth';
import MainScreen from '../src/components/index';

export default function Home() {
  return (
    <div>
      <MainScreen />
    </div>
  );
}

export const getServerSideProps = withAuth((context) => {
  return { props: {} };
});
