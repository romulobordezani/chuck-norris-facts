import { FunctionComponent } from 'react';
import CustomHead from '../components/__shared/custom-head';
import Search from '../components/search';

const HomePage: FunctionComponent = () => (
    <div>
      <CustomHead />
      <Search />
    </div>
  );

export default HomePage;
